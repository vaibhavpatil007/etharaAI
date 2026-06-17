# Ethara AI - Inventory Management System

A professional, full-stack inventory management application built with modern web technologies. Features a FastAPI backend, React frontend, PostgreSQL database, and Docker containerization.

[![GitHub](https://img.shields.io/badge/GitHub-vaibhavpatil007%2FetharaAI-blue)](https://github.com/vaibhavpatil007/etharaAI)
[![License](https://img.shields.io/badge/License-MIT-green)](LICENSE)
[![Status](https://img.shields.io/badge/Status-Production%20Ready-success)](DEPLOYMENT.md)

## 🎯 Key Features

- ✅ **Product Management**: Create, read, update, delete products with stock tracking
- ✅ **Customer Management**: Manage customer profiles and information
- ✅ **Order Management**: Create and process orders with automatic stock validation
- ✅ **Dashboard**: Real-time metrics and professional charts (Pie & Bar charts)
- ✅ **Business Logic**: Automatic stock reduction on orders, prevents overselling
- ✅ **Professional UI**: Modern, responsive design with Tailwind CSS
- ✅ **RESTful API**: Complete REST API with Swagger documentation
- ✅ **Docker Ready**: Full containerization with docker-compose
- ✅ **Production Deployment**: Ready for Railway, Render, or cloud platforms

## 🏗️ Architecture

```
Ethara AI/
├── backend/              # FastAPI REST API
│   ├── app/
│   │   ├── main.py      # Application entry point
│   │   ├── models/      # SQLAlchemy ORM models
│   │   ├── schemas/     # Pydantic data models
│   │   ├── routers/     # API routes
│   │   ├── services/    # Business logic (CRUD operations)
│   │   └── database/    # Database connection
│   ├── requirements.txt # Python dependencies
│   ├── Dockerfile       # Container image
│   └── Procfile         # Deployment configuration
├── frontend/            # React + Vite application
│   ├── src/
│   │   ├── main.jsx     # React entry point
│   │   ├── App.jsx      # App shell with routing
│   │   ├── pages/       # Page components
│   │   ├── services/    # API client
│   │   └── index.css    # Tailwind styles
│   ├── package.json     # Node dependencies
│   ├── vite.config.js   # Vite configuration
│   └── Dockerfile       # Production container
├── docker-compose.yml   # Local development orchestration
├── .env.example         # Environment variables template
├── DEPLOYMENT.md        # Detailed deployment guide
└── README.md            # This file
```

## 🚀 Quick Start

### Local Development

**Prerequisites:**
- Python 3.12+
- Node.js 18+
- Docker & Docker Compose (optional)

**Run with Docker (Recommended):**

```bash
docker compose up --build
```

- Backend: http://localhost:8000
- Frontend: http://localhost:5173
- API Docs: http://localhost:8000/docs

**Manual Setup:**

Backend:
```bash
cd backend
python -m venv .venv
.venv\Scripts\activate  # Windows
# or source .venv/bin/activate  # macOS/Linux
pip install -r requirements.txt
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

Frontend:
```bash
cd frontend
npm install
npm run dev
```

## 📚 API Documentation

### Base URL
- Local: `http://localhost:8000`
- Production: `https://your-backend-url.railway.app`

### Endpoints

#### Products
- `GET /products` - List all products
- `POST /products` - Create new product
- `GET /products/{id}` - Get product details
- `PUT /products/{id}` - Update product
- `DELETE /products/{id}` - Delete product

#### Customers
- `GET /customers` - List all customers
- `POST /customers` - Create new customer
- `GET /customers/{id}` - Get customer details
- `DELETE /customers/{id}` - Delete customer

#### Orders
- `GET /orders` - List all orders
- `POST /orders` - Create new order
- `GET /orders/{id}` - Get order details
- `DELETE /orders/{id}` - Delete order

#### Dashboard
- `GET /dashboard` - Get dashboard statistics

**Full API Documentation**: Visit `/docs` endpoint for interactive Swagger UI

## 🐳 Docker

The application is fully containerized and ready for production deployment.

**Local Docker Compose:**
```bash
docker compose up --build
```

**Production Deployment:**
See [DEPLOYMENT.md](DEPLOYMENT.md) for Railway, Render, or cloud deployment instructions.

## 🌐 Deployment

### Railway (Recommended)

1. Go to https://railway.app and sign in
2. Create new project from GitHub repository
3. Configure environment variables (see [DEPLOYMENT.md](DEPLOYMENT.md))
4. Deploy with one click!

### Other Platforms
- **Render**: See [DEPLOYMENT.md](DEPLOYMENT.md)
- **Heroku**: Docker-based deployment
- **AWS**: ECS, Lambda, or EC2

**Full deployment guide**: [DEPLOYMENT.md](DEPLOYMENT.md)

## 🔧 Technology Stack

- **Backend**: FastAPI, SQLAlchemy, Pydantic, PostgreSQL
- **Frontend**: React 18, Vite, Tailwind CSS, Axios
- **Database**: PostgreSQL
- **Containerization**: Docker, Docker Compose
- **Deployment**: Railway
- **Charting**: Chart.js, react-chartjs-2
- **API Documentation**: Swagger/OpenAPI

## 📋 Business Rules

- ✅ Product SKU must be unique
- ✅ Customer email must be unique
- ✅ Order creation validates available stock
- ✅ Stock decreases automatically when order is created
- ✅ Stock increases when order is deleted
- ✅ Comprehensive error handling and validation

## 📊 Dashboard Features

- Real-time metrics (Products, Customers, Orders, Low Stock)
- Pie chart showing entity distribution
- Bar chart showing products with lowest stock
- Professional, responsive design

## 🔐 Security Notes

- CORS configured for frontend and production URLs
- Environment variables for sensitive data
- SQL injection prevention via SQLAlchemy ORM
- Input validation via Pydantic
- HTTPS ready for production

## 📝 Environment Variables

Create `.env` file in `backend/` directory:

```env
DATABASE_URL=postgresql+psycopg2://user:password@localhost:5432/ethara_db
ALLOWED_ORIGINS=http://localhost:5173,http://127.0.0.1:5173
```

For frontend, set in Railway dashboard:
```
VITE_API_URL=https://your-backend-url.railway.app
```

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## 📄 License

This project is open source and available under the MIT License.

## 📞 Support

For issues and questions:
- GitHub Issues: https://github.com/vaibhavpatil007/etharaAI/issues
- Documentation: [DEPLOYMENT.md](DEPLOYMENT.md)

---

**Status**: ✅ Production Ready | **Last Updated**: 2026-06-17
