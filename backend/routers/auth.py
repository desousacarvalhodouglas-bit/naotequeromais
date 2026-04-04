from fastapi import APIRouter, HTTPException, status, Depends
from motor.motor_asyncio import AsyncIOMotorClient
from bson import ObjectId
from datetime import datetime
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).parent.parent))

from models import UserCreate, UserResponse, Token
from auth_utils import (
    get_password_hash,
    verify_password,
    create_access_token,
    get_current_user_id
)

router = APIRouter(prefix="/auth", tags=["auth"])

def get_db():
    """Get database instance. Must be called after env vars are loaded."""
    import os
    mongo_url = os.environ['MONGO_URL']
    client = AsyncIOMotorClient(mongo_url)
    return client[os.environ['DB_NAME']]

@router.post("/register", response_model=Token)
async def register(user_data: UserCreate):
    db = get_db()
    # Check if user exists
    existing_user = await db.users.find_one({"email": user_data.email})
    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email already registered"
        )
    
    # Create user
    user_dict = user_data.model_dump(exclude={"password"})
    user_dict["password_hash"] = get_password_hash(user_data.password)
    user_dict["avatar"] = f"https://i.pravatar.cc/150?u={user_data.email}"
    user_dict["created_at"] = datetime.utcnow()
    user_dict["updated_at"] = datetime.utcnow()
    
    result = await db.users.insert_one(user_dict)
    
    # Generate token
    access_token = create_access_token(data={"sub": str(result.inserted_id)})
    
    # Return user data
    created_user = await db.users.find_one({"_id": result.inserted_id})
    user_response = UserResponse(
        _id=str(created_user["_id"]),
        name=created_user["name"],
        email=created_user["email"],
        location=created_user["location"],
        phone=created_user.get("phone"),
        account_type=created_user.get("account_type", "particular"),
        avatar=created_user.get("avatar"),
        isPremium=created_user.get("isPremium", False),
        posts_count=created_user.get("posts_count", 0),
        created_at=created_user["created_at"]
    )
    
    return Token(access_token=access_token, user=user_response)

@router.post("/login", response_model=Token)
async def login(email: str, password: str):
    db = get_db()
    # Find user
    user = await db.users.find_one({"email": email})
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password"
        )
    
    # Verify password
    if not verify_password(password, user["password_hash"]):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password"
        )
    
    # Generate token
    access_token = create_access_token(data={"sub": str(user["_id"])})
    
    # Return user data
    user_response = UserResponse(
        _id=str(user["_id"]),
        name=user["name"],
        email=user["email"],
        location=user["location"],
        phone=user.get("phone"),
        account_type=user.get("account_type", "particular"),
        avatar=user.get("avatar"),
        isPremium=user.get("isPremium", False),
        posts_count=user.get("posts_count", 0),
        created_at=user["created_at"]
    )
    
    return Token(access_token=access_token, user=user_response)

@router.get("/me", response_model=UserResponse)
async def get_current_user(user_id: str = Depends(get_current_user_id)):
    db = get_db()
    user = await db.users.find_one({"_id": ObjectId(user_id)})
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found"
        )
    
    return UserResponse(
        _id=str(user["_id"]),
        name=user["name"],
        email=user["email"],
        location=user["location"],
        phone=user.get("phone"),
        account_type=user.get("account_type", "particular"),
        avatar=user.get("avatar"),
        created_at=user["created_at"]
    )

@router.post("/reset-password")
async def reset_password(email: str, new_password: str):
    """Reset password directly without email verification."""
    db = get_db()
    
    # Find user by email
    user = await db.users.find_one({"email": email})
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Email não encontrado"
        )
    
    # Update password
    new_password_hash = get_password_hash(new_password)
    await db.users.update_one(
        {"_id": user["_id"]},
        {"$set": {"password_hash": new_password_hash, "updated_at": datetime.utcnow()}}
    )
    
    return {"message": "Senha atualizada com sucesso", "email": email}
