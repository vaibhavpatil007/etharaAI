from decimal import Decimal
from sqlalchemy.orm import Session
from fastapi import HTTPException
from app.models.models import Product, Customer, Order, OrderItem
from app.schemas.schemas import ProductCreate, ProductUpdate, CustomerCreate, OrderCreate

# Product services

def create_product(db: Session, product: ProductCreate) -> Product:
    existing = db.query(Product).filter(Product.sku == product.sku).first()
    if existing:
        raise HTTPException(status_code=400, detail="SKU already exists")

    new_product = Product(
        name=product.name,
        sku=product.sku,
        price=product.price,
        stock_quantity=product.stock_quantity,
    )
    db.add(new_product)
    db.commit()
    db.refresh(new_product)
    return new_product


def list_products(db: Session):
    return db.query(Product).all()


def get_product(db: Session, product_id: int):
    return db.query(Product).filter(Product.id == product_id).first()


def update_product(db: Session, product_id: int, product_data: ProductUpdate):
    product = get_product(db, product_id)
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")

    if product_data.sku and product_data.sku != product.sku:
        existing = db.query(Product).filter(Product.sku == product_data.sku).first()
        if existing:
            raise HTTPException(status_code=400, detail="SKU already exists")

    for field, value in product_data.dict(exclude_unset=True).items():
        setattr(product, field, value)

    if product.stock_quantity < 0:
        raise HTTPException(status_code=400, detail="Stock quantity cannot be negative")

    db.commit()
    db.refresh(product)
    return product


def delete_product(db: Session, product_id: int):
    product = get_product(db, product_id)
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    db.delete(product)
    db.commit()
    return product

# Customer services

def create_customer(db: Session, customer: CustomerCreate):
    existing = db.query(Customer).filter(Customer.email == customer.email).first()
    if existing:
        raise HTTPException(status_code=400, detail="Customer email already exists")

    new_customer = Customer(
        full_name=customer.full_name,
        email=customer.email,
        phone_number=customer.phone_number,
    )
    db.add(new_customer)
    db.commit()
    db.refresh(new_customer)
    return new_customer


def list_customers(db: Session):
    return db.query(Customer).all()


def get_customer(db: Session, customer_id: int):
    return db.query(Customer).filter(Customer.id == customer_id).first()


def delete_customer(db: Session, customer_id: int):
    customer = get_customer(db, customer_id)
    if not customer:
        raise HTTPException(status_code=404, detail="Customer not found")
    db.delete(customer)
    db.commit()
    return customer

# Order services

def create_order(db: Session, order_data: OrderCreate):
    customer = get_customer(db, order_data.customer_id)
    if not customer:
        raise HTTPException(status_code=404, detail="Customer not found")

    total_amount = Decimal("0.00")
    order_items = []

    for item in order_data.items:
        product = get_product(db, item.product_id)
        if not product:
            raise HTTPException(status_code=404, detail=f"Product {item.product_id} not found")
        if product.stock_quantity < item.quantity:
            raise HTTPException(status_code=400, detail=f"Insufficient stock for product {product.name}")

        product.stock_quantity -= item.quantity
        item_total = Decimal(product.price) * item.quantity
        total_amount += item_total

        order_items.append(OrderItem(
            product_id=product.id,
            quantity=item.quantity,
            unit_price=product.price,
        ))

    order = Order(
        customer_id=customer.id,
        total_amount=total_amount,
        items=order_items,
    )
    db.add(order)
    db.commit()
    db.refresh(order)
    return order


def list_orders(db: Session):
    return db.query(Order).all()


def get_order(db: Session, order_id: int):
    return db.query(Order).filter(Order.id == order_id).first()


def delete_order(db: Session, order_id: int):
    order = get_order(db, order_id)
    if not order:
        raise HTTPException(status_code=404, detail="Order not found")
    for item in order.items:
        product = get_product(db, item.product_id)
        if product:
            product.stock_quantity += item.quantity
    db.delete(order)
    db.commit()
    return order

# Dashboard

def dashboard_stats(db: Session):
    total_products = db.query(Product).count()
    total_customers = db.query(Customer).count()
    total_orders = db.query(Order).count()
    low_stock_products = db.query(Product).filter(Product.stock_quantity <= 5).count()
    return {
        "total_products": total_products,
        "total_customers": total_customers,
        "total_orders": total_orders,
        "low_stock_products": low_stock_products,
    }
