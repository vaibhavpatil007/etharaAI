from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.schemas.schemas import CustomerCreate, CustomerRead
from app.services.crud import create_customer, list_customers, get_customer, delete_customer
from app.database.connection import SessionLocal

router = APIRouter(prefix="/customers", tags=["Customers"])


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("", response_model=CustomerRead)
def create(customer: CustomerCreate, db: Session = Depends(get_db)):
    return create_customer(db, customer)

@router.get("", response_model=list[CustomerRead])
def read_all(db: Session = Depends(get_db)):
    return list_customers(db)

@router.get("/{customer_id}", response_model=CustomerRead)
def read(customer_id: int, db: Session = Depends(get_db)):
    customer = get_customer(db, customer_id)
    if not customer:
        raise HTTPException(status_code=404, detail="Customer not found")
    return customer

@router.delete("/{customer_id}", response_model=CustomerRead)
def delete(customer_id: int, db: Session = Depends(get_db)):
    return delete_customer(db, customer_id)
