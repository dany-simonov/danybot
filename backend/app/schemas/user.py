from pydantic import BaseModel, EmailStr
from typing import Optional

# Shared properties
class UserBase(BaseModel):
    username: str
    email: EmailStr

# Properties to receive on user creation
class UserCreate(UserBase):
    password: str

# Properties to receive on user update
class UserUpdate(UserBase):
    password: Optional[str] = None

# Properties shared by models in DB
class UserInDBBase(UserBase):
    id: int
    is_active: bool
    is_premium: bool
    is_superuser: bool

    class Config:
        from_attributes = True

# Properties to return to client
class User(UserInDBBase):
    pass

# Properties stored in DB
class UserInDB(UserInDBBase):
    hashed_password: str 