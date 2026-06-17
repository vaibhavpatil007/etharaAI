# Inventory Management

Full-stack inventory management application with FastAPI backend and React/Vite frontend.

## Architecture

- `backend/` - FastAPI API server
- `frontend/` - React + Vite UI
- `docker-compose.yml` - local dev with Postgres, backend, frontend

## Run locally

1. Start Docker services:

   ```bash
   docker compose up --build
   ```

2. Backend: http://localhost:8000
3. Frontend: http://localhost:3000

## Backend API Endpoints

- `POST /products`
- `GET /products`
- `GET /products/{id}`
- `PUT /products/{id}`
- `DELETE /products/{id}`
- `POST /customers`
- `GET /customers`
- `GET /customers/{id}`
- `DELETE /customers/{id}`
- `POST /orders`
- `GET /orders`
- `GET /orders/{id}`
- `DELETE /orders/{id}`
- `GET /dashboard`

## Notes

- Uses Postgres for persistence
- Default backend connects to local Postgres at `localhost:5432` and database `ethara`
- If running backend inside Docker, you may need to use `host.docker.internal` instead of `localhost`
- Validates unique product SKU and customer email
- Prevents orders if stock is insufficient
