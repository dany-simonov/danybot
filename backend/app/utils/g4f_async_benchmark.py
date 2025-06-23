import g4f
import asyncio
from typing import List, Dict, Any
import json
from datetime import datetime
import inspect

TIMEOUT = 60  # секунд
QUESTION = "Привет, как дела? Опиши свои возможности."

async def test_provider_with_model(provider_name: str, model: str) -> Dict[str, Any]:
    """Тестирует конкретную модель провайдера с таймаутом"""
    try:
        provider_class = getattr(g4f.Provider, provider_name)
        if not inspect.isclass(provider_class):
            return {
                "provider": provider_name,
                "model": model,
                "success": False,
                "error": "not a class",
                "elapsed": 0,
                "response": None
            }
        provider = provider_class()
        start = asyncio.get_event_loop().time()
        try:
            response = await asyncio.wait_for(
                g4f.ChatCompletion.create_async(
                    model=model,
                    provider=provider,
                    messages=[{"role": "user", "content": QUESTION}]
                ),
                timeout=TIMEOUT
            )
            elapsed = asyncio.get_event_loop().time() - start
            return {
                "provider": provider_name,
                "model": model,
                "success": True,
                "error": None,
                "elapsed": round(elapsed, 2),
                "response": str(response)[:2000]
            }
        except asyncio.TimeoutError:
            elapsed = asyncio.get_event_loop().time() - start
            return {
                "provider": provider_name,
                "model": model,
                "success": False,
                "error": "timeout",
                "elapsed": round(elapsed, 2),
                "response": None
            }
        except Exception as e:
            elapsed = asyncio.get_event_loop().time() - start
            return {
                "provider": provider_name,
                "model": model,
                "success": False,
                "error": str(e),
                "elapsed": round(elapsed, 2),
                "response": None
            }
    except Exception as e:
        return {
            "provider": provider_name,
            "model": model,
            "success": False,
            "error": f"init error: {e}",
            "elapsed": 0,
            "response": None
        }

async def test_all_providers() -> List[Dict[str, Any]]:
    results = []
    providers = [name for name in dir(g4f.Provider) if not name.startswith('_')]
    for provider_name in providers:
        try:
            provider_class = getattr(g4f.Provider, provider_name)
            if not inspect.isclass(provider_class):
                continue
            provider = provider_class()
            # Получаем список моделей для провайдера
            if hasattr(provider, 'models') and isinstance(provider.models, (list, tuple)):
                models = provider.models
            else:
                models = ['gpt-3.5-turbo', 'gpt-4', 'gpt-4-turbo']
            print(f"\nТестируем провайдер: {provider_name}")
            print(f"Доступные модели: {models}")
            for model in models:
                print(f"Тестируем модель: {model}")
                result = await test_provider_with_model(provider_name, model)
                results.append(result)
                if result['success']:
                    print(f"✅ {provider_name} ({model}): Успешно за {result['elapsed']} сек")
                else:
                    print(f"❌ {provider_name} ({model}): {result['error']}")
        except Exception as e:
            print(f"❌ {provider_name}: Ошибка при инициализации — {str(e)}")
    return results

async def main():
    results = await test_all_providers()
    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    filename = f"g4f_async_benchmark_{timestamp}.json"
    with open(filename, 'w', encoding='utf-8') as f:
        json.dump(results, f, ensure_ascii=False, indent=2)
    print(f"\nРезультаты сохранены в файл: {filename}")

if __name__ == "__main__":
    asyncio.run(main()) 