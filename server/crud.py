from sqlalchemy.orm import Session,joinedload
from passlib.context import CryptContext
import models, schemas

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def get_user_by_email(db: Session, email: str):
    return db.query(models.User).filter(models.User.email == email).first()

def create_user(db: Session, user: schemas.UserCreate):
    hashed_password = pwd_context.hash(user.password)
    db_user = models.User(email=user.email, hashed_password=hashed_password, username=user.username)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

def check_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)


def mark_leetcode_completed(db: Session, user_id: int, leetcode_question_id: int):
    """
    Marks a LeetCode question as completed for a user.
    If no history exists, creates one.
    """
    history = db.query(models.LeetCodeQuestionHistory)\
        .filter(
            models.LeetCodeQuestionHistory.user_id == user_id,
            models.LeetCodeQuestionHistory.leetcode_question_id == leetcode_question_id
        ).first()
    
    if history:
        history.completed = True
    else:
        history = models.LeetCodeQuestionHistory(
            user_id=user_id,
            leetcode_question_id=leetcode_question_id,
            completed=True
        )
        db.add(history)
    
    db.commit()
    db.refresh(history)
    return history

def mark_leetcode_incompleted(db: Session, user_id: int, leetcode_question_id: int):
    """
    Marks a LeetCode question as incompleted for a user.
    If no history exists, creates one with completed=False.
    """
    history = db.query(models.LeetCodeQuestionHistory)\
        .filter(
            models.LeetCodeQuestionHistory.user_id == user_id,
            models.LeetCodeQuestionHistory.leetcode_question_id == leetcode_question_id
        ).first()
    
    if history:
        history.completed = False
    else:
        history = models.LeetCodeQuestionHistory(
            user_id=user_id,
            leetcode_question_id=leetcode_question_id,
            completed=False
        )
        db.add(history)
    
    db.commit()
    db.refresh(history)
    return history


def get_user_progress(db: Session, user_id: int):
    """
    Returns a list of all LeetCode questions with a 'completed' flag
    for the given user.
    """
    # Get all questions and eagerly load history
    questions = db.query(models.LeetCodeQuestion)\
        .options(joinedload(models.LeetCodeQuestion.history))\
        .all()

    progress_list = []
    for q in questions:
        # Find if user has completed this question
        completed = False
        for h in q.history:
            if h.user_id == user_id:
                completed = h.completed
                break

        progress_list.append({
            "id": q.id,
            "title": q.title,
            "url": q.url,
            "category": q.category,
            "list_type": q.list_type,
            "completed": completed
        })

    return progress_list