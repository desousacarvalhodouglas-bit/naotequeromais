from pydantic import BaseModel, Field, EmailStr, ConfigDict
from typing import Optional, List, Annotated
from datetime import datetime
from bson import ObjectId

class UserBase(BaseModel):
    name: str
    email: EmailStr
    location: str = "Brasil"
    phone: Optional[str] = None
    account_type: str = "particular"  # particular, autonomo, empresa

class UserCreate(UserBase):
    password: str

class UserResponse(UserBase):
    id: str = Field(alias="_id")
    avatar: Optional[str] = None
    created_at: datetime

    model_config = ConfigDict(
        populate_by_name=True,
        json_encoders={ObjectId: str}
    )

class UserInDB(UserBase):
    password_hash: str
    avatar: Optional[str] = None
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)

class Token(BaseModel):
    access_token: str
    token_type: str = "bearer"
    user: UserResponse

class PostBase(BaseModel):
    description: str
    location: str
    budget: str = "A combinar"
    images: List[str] = []
    videos: List[str] = []

class PostCreate(PostBase):
    pass

class PostResponse(PostBase):
    id: str = Field(alias="_id")
    user_id: str
    user_name: str
    user_avatar: Optional[str] = None
    likes: int = 0
    recommends: int = 0
    responses: int = 0
    created_at: datetime
    user_liked: bool = False
    user_recommended: bool = False

    model_config = ConfigDict(
        populate_by_name=True,
        json_encoders={ObjectId: str}
    )

class PostInDB(PostBase):
    user_id: str
    likes: int = 0
    recommends: int = 0
    responses: int = 0
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)

class InteractionCreate(BaseModel):
    type: str  # like, recommend, respond
    response_text: Optional[str] = None

class InteractionResponse(BaseModel):
    id: str = Field(alias="_id")
    post_id: str
    user_id: str
    type: str
    response_text: Optional[str] = None
    created_at: datetime

    model_config = ConfigDict(
        populate_by_name=True,
        json_encoders={ObjectId: str}
    )

class MessageCreate(BaseModel):
    receiver_id: str
    text: str
    images: List[str] = []

class MessageResponse(BaseModel):
    id: str = Field(alias="_id")
    conversation_id: str
    sender_id: str
    receiver_id: str
    text: str
    images: List[str] = []
    read: bool = False
    created_at: datetime

    model_config = ConfigDict(
        populate_by_name=True,
        json_encoders={ObjectId: str}
    )

class ConversationResponse(BaseModel):
    conversation_id: str
    other_user_id: str
    other_user_name: str
    other_user_avatar: Optional[str] = None
    last_message: str
    last_message_time: datetime
    unread_count: int = 0
