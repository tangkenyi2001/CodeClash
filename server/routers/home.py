from fastapi import APIRouter, Depends, HTTPException,status
from sqlalchemy.orm import Session

import crud
import models
import schemas
from database import SessionLocal, engine, Base
from loadData import seed_questions
from datetime import datetime, timedelta
import jwt  # pip install pyjwt
from .auth import get_current_user
Base.metadata.create_all(bind=engine)
seed_questions()

router = APIRouter()
SECRET_KEY = "your-secret-key"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 60  # 1 hour


# Dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()



@router.post("/questions/{question_id}/complete/",response_model=schemas.UpdateQuestionStatusRequest)
async def mark_leetcode_completed(
    question_id: int, 
    current_user: models.User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    history = crud.mark_leetcode_completed(db, user_id=current_user.id, leetcode_question_id=question_id)
    return {"message": "✅ Question marked as completed", "history": history.id,"completed":history.completed}


@router.post("/questions/{question_id}/incomplete/",response_model=schemas.UpdateQuestionStatusRequest)
async def mark_leetcode_incompleted(
    question_id: int, 
    current_user: models.User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    history = crud.mark_leetcode_incompleted(db, user_id=current_user.id, leetcode_question_id=question_id)
    return {"message": "✅ Question marked as incompleted", "history": history.id,"completed":history.completed}


@router.get("/users/progress/", response_model=schemas.QuestionsResponse)
async def get_user_progress(
    current_user: models.User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    progress = crud.get_user_progress(db, user_id=current_user.id)
    return progress
