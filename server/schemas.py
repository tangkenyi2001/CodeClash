from pydantic import BaseModel,HttpUrl,RootModel
from typing import Optional,List

class UserBase(BaseModel):
    username: str
    email: str

class UserCreate(UserBase):
    password: str

class UserLogin(BaseModel):
    email: str
    password: str

class User(UserBase):
    id: int

    class Config:
        orm_mode = True

class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    user_Id: Optional[int] = None

class LoginResponse(BaseModel):
    token: Token
    user: User
    
class UpdateQuestionStatusRequest(BaseModel):
    message:str
    history:int
    completed: bool

class QuestionResponse(BaseModel):
    id: int
    title: str
    url: HttpUrl
    category: str
    list_type: str
    completed: bool

    class Config:
        from_attributes = True  # allows SQLAlchemy objects to be converted
class QuestionsResponse(RootModel[List[QuestionResponse]]):
    """
    A root model representing a list of QuestionResponse items.
    """
    pass