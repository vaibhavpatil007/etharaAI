from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.schemas.schemas import ProductCreate, ProductRead, ProductUpdate
from app.services.crud import create_product, list_products, get_product, update_product, delete_product
from app.database.connection import SessionLocal

router = APIRouter(prefix="/products", tags=["Products"])


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("", response_model=ProductRead)
def create(product: ProductCreate, db: Session = Depends(get_db)):
    return create_product(db, product)

@router.get("", response_model=list[ProductRead])
def read_all(db: Session = Depends(get_db)):
    return list_products(db)

@router.get("/{product_id}", response_model=ProductRead)
def read(product_id: int, db: Session = Depends(get_db)):
    product = get_product(db, product_id)
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    return product

@router.put("/{product_id}", response_model=ProductRead)
def update(product_id: int, payload: ProductUpdate, db: Session = Depends(get_db)):
    return update_product(db, product_id, payload)

@router.delete("/{product_id}", response_model=ProductRead)
def delete(product_id: int, db: Session = Depends(get_db)):
    return delete_product(db, product_id)
