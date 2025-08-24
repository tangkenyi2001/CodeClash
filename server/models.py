from sqlalchemy import Boolean, Column, ForeignKey, Integer, String
from sqlalchemy.orm import relationship

from database import Base


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String(255), unique=True, index=True)
    email = Column(String(255), unique=True, index=True)
    hashed_password = Column(String(255))
    leetcode_history = relationship(
        "LeetCodeQuestionHistory", back_populates="user"
    )

class LeetCodeQuestion(Base):
    __tablename__ = "leetcode_questions"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(255), index=True)
    url = Column(String(500), index=True)
    category = Column(String(100), index=True)
    list_type = Column(String(100), index=True)

    history = relationship("LeetCodeQuestionHistory",
                           back_populates="leetcode_question")


class LeetCodeQuestionHistory(Base):
    __tablename__ = "leetcode_question_history"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    leetcode_question_id = Column(Integer, ForeignKey("leetcode_questions.id"))
    completed = Column(Boolean, default=False)

    user = relationship("User", back_populates="leetcode_history")
    leetcode_question = relationship(
        "LeetCodeQuestion", back_populates="history")
