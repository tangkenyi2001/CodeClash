from sqlalchemy.orm import Session
from sqlalchemy.exc import IntegrityError
from database import SessionLocal
from models import LeetCodeQuestion
from data.blind75 import blind75Data
from data.neetcode150 import neetCode150Data


def seed_questions():
    db: Session = SessionLocal()

    try:
        # Blind75
        for category, urls in blind75Data.items():
            for url in urls:
                existing = db.query(
                    LeetCodeQuestion).filter_by(url=url).first()
                if existing:
                    continue  # skip duplicate

                new_q = LeetCodeQuestion(
                    title=url.split("/")[-2].replace("-", " ").title(),
                    url=url,
                    category=category,
                    list_type="Blind75",
                )
                db.add(new_q)

        # NeetCode150
        for category, urls in neetCode150Data.items():
            for url in urls:
                existing = db.query(
                    LeetCodeQuestion).filter_by(url=url).first()
                if existing:
                    continue  # skip duplicate

                new_q = LeetCodeQuestion(
                    title=url.split("/")[-2].replace("-", " ").title(),
                    url=url,
                    category=category,
                    list_type="NeetCode150",
                )
                db.add(new_q)

        db.commit()
        print("✅ Questions seeded successfully (skipped duplicates).")
    except Exception as e:
        db.rollback()
        print("❌ Error seeding questions:", e)
    finally:
        db.close()
