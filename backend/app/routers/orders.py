from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.schemas.schemas import OrderCreate, OrderRead
from app.services.crud import create_order, list_orders, get_order, delete_order
from app.database.connection import SessionLocal

router = APIRouter(prefix="/orders", tags=["Orders"])


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("", response_model=OrderRead)
def create(order: OrderCreate, db: Session = Depends(get_db)):
    return create_order(db, order)

@router.get("", response_model=list[OrderRead])
def read_all(db: Session = Depends(get_db)):
    return list_orders(db)

@router.get("/{order_id}", response_model=OrderRead)
def read(order_id: int, db: Session = Depends(get_db)):
    order = get_order(db, order_id)
    if not order:
        raise HTTPException(status_code=404, detail="Order not found")
    return order

@router.delete("/{order_id}", response_model=OrderRead)
def delete(order_id: int, db: Session = Depends(get_db)):
    return delete_order(db, order_id)
