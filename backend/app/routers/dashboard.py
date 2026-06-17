from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.schemas.schemas import DashboardRead
from app.services.crud import dashboard_stats
from app.database.connection import SessionLocal

router = APIRouter(prefix="/dashboard", tags=["Dashboard"])


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

def get_stats(db: Session = Depends(get_db)):
    return dashboard_stats(db)
@router.get("/", response_model=DashboardRead)
def get_stats(db: Session = Depends(get_db)):
    return dashboard_stats(db)
