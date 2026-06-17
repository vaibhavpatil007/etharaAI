# Railway Deployment - Step-by-Step Guide

## 📋 Pre-Deployment Checklist

- ✅ Code pushed to GitHub: https://github.com/vaibhavpatil007/etharaAI
- ✅ Backend production-ready with Procfile
- ✅ Frontend optimized with multi-stage Dockerfile
- ✅ Environment variables configured
- ✅ CORS properly set up for production

---

## 🚀 Step 1: Create Railway Account

1. Go to https://railway.app
2. Sign up or log in with GitHub
3. Authorize Railway to access your GitHub repositories

---

## 🚀 Step 2: Create New Project on Railway

1. Click **"Create New Project"** or **"New"** button
2. Select **"Deploy from GitHub repo"**
3. Find and select **`vaibhavpatil007/etharaAI`**
4. Click **"Deploy"**

Railway will automatically detect your services:
- Backend (FastAPI)
- Frontend (React)

---

## 🚀 Step 3: Configure PostgreSQL Database

1. In the Railway dashboard, click **"New"** → **"Database"** → **"PostgreSQL"**
2. Railway will create and provision the database automatically
3. Once created, click on the **PostgreSQL** service
4. Go to the **Variables** tab
5. Copy the `DATABASE_URL` variable (looks like: `postgresql+psycopg2://user:password@host:port/railway`)

**Important**: This URL will be used in the backend configuration

---

## 🚀 Step 4: Configure Backend Service

1. Click on the **backend** service in the Railway dashboard
2. Go to **Settings** → **Environment**
3. Click **"Add Variable"** and add:

```
Name: DATABASE_URL
Value: (paste the PostgreSQL DATABASE_URL from Step 3)
```

4. Click **"Add Variable"** again and add:

```
Name: ALLOWED_ORIGINS
Value: https://<your-frontend-url>.railway.app
```

(Replace `<your-frontend-url>` with the actual frontend URL shown in Railway)

5. Click **"Deploy"** to apply changes

The backend should now be running at: `https://<your-backend-url>.railway.app`

---

## 🚀 Step 5: Configure Frontend Service

1. Click on the **frontend** service in the Railway dashboard
2. Go to **Settings** → **Environment**
3. Click **"Add Variable"** and add:

```
Name: VITE_API_URL
Value: https://<your-backend-url>.railway.app
```

(Replace `<your-backend-url>` with the actual backend URL shown in Railway)

4. Click **"Deploy"** to redeploy with new environment variable

---

## ✅ Step 6: Verify Deployment

Wait for all services to show "SUCCESS" status (usually 2-5 minutes).

Then test each component:

### Test Frontend
1. Open the frontend URL in your browser: `https://<your-frontend-url>.railway.app`
2. You should see the Inventory Management dashboard
3. Check if the metrics cards load (Products, Customers, Orders, Low Stock)
4. Verify the charts render correctly

### Test Backend
1. Open the backend Swagger documentation: `https://<your-backend-url>.railway.app/docs`
2. You should see all API endpoints listed
3. Try the **GET /dashboard** endpoint - it should return statistics

### Test Database Connection
1. In the frontend, navigate to **Products** tab
2. Try creating a new product
3. If it saves successfully, the database is connected! ✅

---

## 📱 Access Your Deployed Application

- **Frontend**: `https://<your-frontend-url>.railway.app`
- **Backend API**: `https://<your-backend-url>.railway.app`
- **API Documentation**: `https://<your-backend-url>.railway.app/docs`
- **PostgreSQL**: Managed by Railway (connection details in Variables)

---

## 🔧 Common Issues & Fixes

### Issue: Frontend shows "Failed to fetch" errors
**Solution**: 
- Check `VITE_API_URL` in frontend environment variables
- Verify backend service is running (check Logs)
- Ensure CORS is configured: `ALLOWED_ORIGINS` includes frontend URL

### Issue: Backend won't start
**Solution**:
- Check backend **Logs** tab for errors
- Verify `DATABASE_URL` is correct in Variables
- Ensure PostgreSQL service is running

### Issue: Dashboard shows no data
**Solution**:
- Check if database tables were created (check backend logs for initialization)
- Try creating a product via API docs
- Refresh the page

### Issue: API returns CORS error
**Solution**:
- Update `ALLOWED_ORIGINS` in backend variables
- Include the exact frontend URL (including https://)
- Redeploy backend

---

## 📊 Monitoring & Management

### View Logs
1. Click on any service (backend, frontend, or PostgreSQL)
2. Click **"Logs"** tab
3. View real-time application logs

### View Metrics
1. Click on any service
2. Click **"Metrics"** tab
3. Monitor CPU, Memory, and Disk usage

### Scale Resources
1. Click on any service
2. Click **"Settings"** tab
3. Upgrade plan for more resources

---

## 🔒 Production Security Checklist

- ✅ HTTPS enabled (Railway provides free SSL)
- ✅ Environment variables secure (not in code)
- ✅ CORS configured for production domain
- ✅ Database protected (managed by Railway)
- ✅ API validation enabled (Pydantic schemas)
- ✅ Error handling implemented

---

## 🎉 Deployment Complete!

Your Ethara AI Inventory Management System is now live on Railway!

### Next Steps (Optional)
- Add custom domain (in Railway Settings)
- Enable auto-deploy on git push (already enabled by default)
- Set up monitoring alerts
- Configure backup strategy
- Add CI/CD tests

### Resources
- Railway Documentation: https://docs.railway.app
- FastAPI Deployment: https://fastapi.tiangolo.com/deployment/
- Vite Production Build: https://vitejs.dev/guide/build.html

---

**Last Updated**: 2026-06-17
**Status**: Ready for Production Deployment ✅
