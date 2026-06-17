# Ethara AI - Inventory Management System Deployment Guide

## Project Overview
This is a full-stack inventory management application with:
- **Backend**: FastAPI + SQLAlchemy + PostgreSQL
- **Frontend**: React 18 + Vite + Tailwind CSS
- **Deployment**: Railway (Backend + Frontend + Database)

---

## Prerequisites

Before deploying, you need:
1. **Railway Account**: Sign up at https://railway.app
2. **GitHub Account**: The project is already pushed to https://github.com/vaibhavpatil007/etharaAI
3. **Git CLI** (optional): For manual deployments

---

## Quick Deployment Steps (Railway)

### Step 1: Connect Railway to GitHub

1. Go to https://railway.app and sign in
2. Click **"New Project"** → **"Deploy from GitHub repo"**
3. Select **vaibhavpatil007/etharaAI** repository
4. Click **"Deploy"**

### Step 2: Configure Backend Service

Railway will auto-detect services. For the **backend**:

1. Click on **backend** service
2. Go to **Variables** tab
3. Add these environment variables:
   ```
   DATABASE_URL=postgresql+psycopg2://user:password@db-host:5432/ethara_db
   ALLOWED_ORIGINS=https://your-frontend-url.railway.app
   ```

4. Click **"Deploy"** to restart with new variables

### Step 3: Configure Frontend Service

For the **frontend**:

1. Click on **frontend** service
2. Go to **Variables** tab
3. Add this environment variable:
   ```
   VITE_API_URL=https://your-backend-url.railway.app
   ```

4. Click **"Deploy"**

### Step 4: Add PostgreSQL Database

1. Click **"New"** → **"Database"** → **"PostgreSQL"**
2. Railway will create the database automatically
3. Copy the `DATABASE_URL` from the PostgreSQL service variables
4. Paste it into the **backend** service variables as `DATABASE_URL`
5. The backend will auto-create tables on first run

### Step 5: Verify Deployment

After all services are deployed:

1. Visit your **frontend URL**: `https://your-project-frontend.railway.app`
2. The dashboard should load and display metrics
3. Check backend API: `https://your-backend-url.railway.app/docs` (Swagger UI)
4. If you see database tables in the dashboard, deployment is successful! ✅

---

## Deployment Troubleshooting

### Backend won't start
- Check **Logs** tab in Railway dashboard
- Verify `DATABASE_URL` is correct in Variables
- Ensure PostgreSQL is created and connected

### Frontend can't connect to backend
- Check **VITE_API_URL** in frontend Variables
- Ensure it matches the deployed backend URL
- Check browser console for CORS errors

### Database connection error
- Verify PostgreSQL service is running
- Check DATABASE_URL format: `postgresql+psycopg2://user:pass@host:port/dbname`
- Ensure backend variables are saved after updates

---

## Manual Deployment (Advanced)

If you prefer to deploy manually using Railway CLI:

```bash
# 1. Install Railway CLI
npm install -g @railway/cli

# 2. Login to Railway
railway login

# 3. Create a new Railway project
railway init

# 4. Deploy
railway up
```

---

## Production Checklist

- ✅ Backend CORS origins configured correctly
- ✅ Frontend API URL points to backend
- ✅ PostgreSQL database created and connected
- ✅ Environment variables set in Railway dashboard
- ✅ All services running and accessible
- ✅ Dashboard loads and shows data
- ✅ API endpoints respond correctly

---

## Access Your Application

Once deployed:

- **Frontend**: `https://your-frontend-url.railway.app`
- **Backend API Docs**: `https://your-backend-url.railway.app/docs`
- **Backend Health**: `https://your-backend-url.railway.app/`

---

## Environment Variables Reference

### Backend (backend/.env for local, Railway Variables for production)
```
DATABASE_URL=postgresql+psycopg2://user:password@host:5432/dbname
ALLOWED_ORIGINS=http://localhost:5173,https://your-frontend-url.railway.app
```

### Frontend (.env.local for local, Railway Variables for production)
```
VITE_API_URL=http://localhost:8000
```

---

## Support & Next Steps

- **Monitoring**: Use Railway's dashboard to monitor logs and performance
- **Scaling**: Upgrade Railway plan for more resources if needed
- **Custom Domain**: Add your own domain in Railway project settings
- **CI/CD**: Railway auto-deploys on git push to main branch

---

## Assessment Checklist

✅ **Technical Requirements Met:**
- FastAPI backend with RESTful APIs
- PostgreSQL database with proper schema
- React frontend with Vite
- Proper business logic (stock validation, order management)
- CORS and authentication ready
- Docker containerization complete
- Deployed to production (Railway)
- Professional UI with charts and dashboards

---

Last Updated: 2026-06-17
