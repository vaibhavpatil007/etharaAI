from datetime import datetime
from typing import List, Optional
from pydantic import BaseModel, EmailStr, constr, condecimal, PositiveInt

class ProductBase(BaseModel):
    name: str
    sku: constr(strict=True, min_length=1)
    price: condecimal(max_digits=10, decimal_places=2)
    stock_quantity: int

class ProductCreate(ProductBase):
    pass

class ProductUpdate(BaseModel):
    name: Optional[str] = None
    sku: Optional[constr(strict=True, min_length=1)] = None
    price: Optional[condecimal(max_digits=10, decimal_places=2)] = None
    stock_quantity: Optional[int] = None

class ProductRead(ProductBase):
    id: int
    created_at: datetime

    class Config:
        from_attributes = True

class CustomerBase(BaseModel):
    full_name: str
    email: EmailStr
    phone_number: Optional[str] = None

class CustomerCreate(CustomerBase):
    pass

class CustomerRead(CustomerBase):
    id: int
    created_at: datetime

    class Config:
        from_attributes = True

class OrderItemCreate(BaseModel):
    product_id: int
    quantity: PositiveInt

class OrderCreate(BaseModel):
    customer_id: int
    items: List[OrderItemCreate]

class OrderItemRead(BaseModel):
    id: int
    product_id: int
    quantity: int
    unit_price: condecimal(max_digits=10, decimal_places=2)

    class Config:
        from_attributes = True

class OrderRead(BaseModel):
    id: int
    customer_id: int
    total_amount: condecimal(max_digits=12, decimal_places=2)
    created_at: datetime
    items: List[OrderItemRead]

    class Config:
        from_attributes = True

class DashboardRead(BaseModel):
    total_products: int
    total_customers: int
    total_orders: int
    low_stock_products: int
