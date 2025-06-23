from typing import Any, List

from fastapi import APIRouter, Body, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession

from app import crud
from app.api import deps
from app.schemas import user
from app.models.user import User as UserModel

router = APIRouter()

@router.post("/", response_model=user.User)
async def create_user(
    *,
    db: AsyncSession = Depends(deps.get_db),
    user_in: user.UserCreate,
) -> Any:
    """
    Create new user.
    """
    user_obj = await crud.user.get_by_email(db, email=user_in.email)
    if user_obj:
        raise HTTPException(
            status_code=400,
            detail="The user with this username already exists in the system.",
        )
    user_obj = await crud.user.create(db, obj_in=user_in)
    return user_obj

@router.get("/me", response_model=user.User)
def read_user_me(
    current_user: UserModel = Depends(deps.get_current_user),
) -> Any:
    """
    Get current user.
    """
    return current_user 