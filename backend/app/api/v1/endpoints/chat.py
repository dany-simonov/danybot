from fastapi import APIRouter, UploadFile, File, Form, HTTPException
from fastapi.responses import JSONResponse
from typing import List, Optional
import asyncio
import os
import uuid
import logging
import traceback

# Импортируйте g4f и настройте путь, если нужно
try:
    import g4f
except ImportError:
    g4f = None

router = APIRouter()

MEDIA_DIR = "generated_media"
os.makedirs(MEDIA_DIR, exist_ok=True)

@router.post("/")
async def chat(
    message: str = Form(...),
    provider: str = Form(...),
    model: str = Form(...),
    category: str = Form(...),
    files: Optional[List[UploadFile]] = File(None)
):
    """
    Обработка чата с ИИ: поддержка текста, изображений, аудио, research, файлов.
    """
    print(f"[DEBUG] /api/v1/chat вызван: message={message}, provider={provider}, model={model}, category={category}")
    logging.info(f"[DEBUG] /api/v1/chat вызван: message={message}, provider={provider}, model={model}, category={category}")
    if not g4f:
        print("[ERROR] g4f не установлен!")
        return JSONResponse(status_code=500, content={"response": "g4f не установлен на сервере"})

    # Пример: подготовка prompt и файлов
    prompt = message
    file_urls = []
    saved_files = []
    if files:
        for upload in files:
            ext = os.path.splitext(upload.filename)[-1]
            fname = f"{uuid.uuid4().hex}{ext}"
            fpath = os.path.join(MEDIA_DIR, fname)
            with open(fpath, "wb") as f:
                content = await upload.read()
                f.write(content)
            file_urls.append({"name": upload.filename, "url": f"/generated_media/{fname}"})
            saved_files.append(fpath)

    # Пример вызова g4f (универсальный, для разных категорий)
    try:
        # Для мультимодальных моделей можно добавить обработку файлов
        # Здесь только текстовый пример
        response = await asyncio.wait_for(
            g4f.ChatCompletion.create_async(
                model=model,
                provider=provider,
                messages=[{"role": "user", "content": prompt}],
                # files=saved_files, # если g4f поддерживает
            ),
            timeout=60
        )
        try:
            print(f"[DEBUG] Ответ g4f: {response}")
        except UnicodeEncodeError:
            print(f"[DEBUG] Ответ g4f: (есть неотображаемые символы, длина={len(str(response))})")
        return {"response": response, "files": file_urls}
    except Exception as e:
        tb = traceback.format_exc()
        print(f"[ERROR] Ошибка в chat endpoint: {e}\n{tb}")
        return JSONResponse(status_code=500, content={"response": f"Ошибка: {str(e)}", "traceback": tb}) 