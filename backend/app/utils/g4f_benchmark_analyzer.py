import json
from typing import Dict, List, Any
from datetime import datetime
import re

def classify_provider(response: str) -> List[str]:
    """Классифицирует провайдера по его ответу"""
    classes = []
    response = response.lower()
    
    # Текстовые возможности
    if any(x in response for x in [
        'текст', 'text', 'chat', 'ответ', 'отвечать', 'диалог', 
        'conversation', 'message', 'писать', 'общаться'
    ]):
        classes.append('text')
    
    # Изображения
    if any(x in response for x in [
        'картин', 'image', 'рисун', 'фото', 'draw', 'picture',
        'visual', 'изображен', 'генерир', 'создавать изображен'
    ]):
        classes.append('image')
    
    # Аудио
    if any(x in response for x in [
        'аудио', 'audio', 'звук', 'voice', 'speech', 'голос',
        'музык', 'mp3', 'wav', 'произнош', 'говор'
    ]):
        classes.append('audio')
    
    # Исследования/Аналитика
    if any(x in response for x in [
        'research', 'исследован', 'анализ', 'научн', 'paper',
        'deep', 'аналитик', 'изуч', 'статья', 'публикац'
    ]):
        classes.append('research')
    
    # Если не определили тип, но ответ есть
    if not classes and len(response.strip()) > 0:
        classes.append('text')  # По умолчанию считаем текстовым
    
    return classes or ['unknown']

def analyze_benchmark_results(input_file: str) -> Dict[str, Any]:
    """Анализирует результаты тестирования и создает итоговый отчет"""
    with open(input_file, 'r', encoding='utf-8') as f:
        results = json.load(f)
    
    # Структура для хранения рабочих провайдеров
    working_providers = {
        'text': [],
        'image': [],
        'audio': [],
        'research': [],
        'unknown': []
    }
    
    # Анализируем каждый результат
    for result in results:
        if not result['success']:
            continue
            
        provider_info = {
            'provider': result['provider'],
            'model': result['model'],
            'elapsed': result['elapsed'],
            'response_sample': result['response'][:200] if result['response'] else None
        }
        
        # Классифицируем провайдера
        classes = classify_provider(result['response'] or '')
        
        # Добавляем в соответствующие категории
        for class_type in classes:
            if class_type in working_providers:
                working_providers[class_type].append(provider_info)
    
    # Сортируем провайдеров по времени ответа
    for category in working_providers:
        working_providers[category].sort(key=lambda x: x['elapsed'])
    
    # Формируем итоговую статистику
    stats = {
        'total_tested': len(results),
        'total_working': sum(len(providers) for providers in working_providers.values()),
        'by_category': {
            category: len(providers)
            for category, providers in working_providers.items()
        }
    }
    
    return {
        'analyzed_at': datetime.now().isoformat(),
        'statistics': stats,
        'working_providers': working_providers
    }

def main():
    # Находим последний файл с результатами
    import glob
    benchmark_files = glob.glob('g4f_async_benchmark_*.json')
    if not benchmark_files:
        print("Не найдены файлы с результатами тестирования!")
        return
    
    latest_file = max(benchmark_files)
    print(f"Анализируем файл: {latest_file}")
    
    # Анализируем результаты
    analysis = analyze_benchmark_results(latest_file)
    
    # Сохраняем анализ
    output_file = f"g4f_analysis_{datetime.now().strftime('%Y%m%d_%H%M%S')}.json"
    with open(output_file, 'w', encoding='utf-8') as f:
        json.dump(analysis, f, ensure_ascii=False, indent=2)
    
    # Выводим краткую статистику
    stats = analysis['statistics']
    print("\n=== СТАТИСТИКА АНАЛИЗА ===")
    print(f"Всего протестировано: {stats['total_tested']}")
    print(f"Всего работает: {stats['total_working']}")
    print("\nПо категориям:")
    for category, count in stats['by_category'].items():
        if count > 0:
            print(f"- {category}: {count}")
    
    print(f"\nПодробный анализ сохранен в файл: {output_file}")

if __name__ == "__main__":
    main() 