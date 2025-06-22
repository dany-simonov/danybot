from fastapi import FastAPI
from app.db.base import Base
from app.db.session import engine
from app.api.v1.api import api_router
from app.core.config import settings

app = FastAPI(title=settings.PROJECT_NAME)

@app.on_event("startup")
async def startup_event():
    async with engine.begin() as conn:
        # await conn.run_sync(Base.metadata.drop_all) # Use for development to drop tables
        await conn.run_sync(Base.metadata.create_all)

app.include_router(api_router, prefix=settings.API_V1_STR)

@app.get("/")
def root():
    return {"message": "DanyBot backend is running!"} 