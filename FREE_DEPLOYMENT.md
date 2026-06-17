# Free Deployment Guide: Render + Vercel

Deploy your Ethara AI application completely FREE using:
- **Backend**: Render (FastAPI)
- **Database**: Render (PostgreSQL - free tier)
- **Frontend**: Vercel (React/Vite)

No credit card required! ✅

---

## 📊 Free Tier Comparison

| Platform | Service | Free Tier | Limits |
|----------|---------|-----------|--------|
| **Render** | Backend | ✅ Yes | Spins down after 15 min inactivity, ~0.5 GB RAM |
| **Render** | PostgreSQL | ✅ Yes | 256 MB storage, auto-delete after 90 days of inactivity |
| **Vercel** | Frontend | ✅ Yes | Unlimited bandwidth, 100 GB storage |

**Note**: Free tier services spin down after inactivity. First request after spin-down takes 30 seconds.

---

## 🚀 Part 1: Deploy Backend on Render

### Step 1: Create Render Account
1. Go to https://render.com
2. Sign up with GitHub account
3. Authorize Render to access your repositories

### Step 2: Create Web Service (Backend)
1. Go to Render dashboard
2. Click **"New +"** → **"Web Service"**
3. Select **"vaibhavpatil007/etharaAI"** repository
4. Select **"Public"** for repository visibility
5. Configure:
   ```
   Name: ethara-backend
   Environment: Python 3
   Build Command: pip install -r requirements.txt
   Start Command: uvicorn app.main:app --host 0.0.0.0 --port $PORT
   Branch: main
   ```

6. Click **"Advanced"** and add environment variables:
   ```
   DATABASE_URL: (we'll add this after creating PostgreSQL)
   ALLOWED_ORIGINS: https://ethara-frontend.vercel.app
   ```

7. Click **"Create Web Service"**
8. Wait for deployment (2-3 minutes)

### Step 3: Create PostgreSQL Database
1. In Render dashboard, click **"New +"** → **"PostgreSQL"**
2. Configure:
   ```
   Name: ethara-db
   Database: ethara_db
   User: postgres
   Region: (choose closest to you)
   ```

3. Select **"Free"** plan
4. Click **"Create Database"**
5. Wait for database creation (1-2 minutes)

### Step 4: Connect Database to Backend
1. Copy the **Internal Database URL** from PostgreSQL dashboard
   - Format: `postgresql://user:password@host:5432/dbname`
   
2. Go to backend service → **"Environment"**
3. Click **"Add Environment Variable"**
4. Add:
   ```
   Name: DATABASE_URL
   Value: (paste the Internal Database URL)
   ```

5. **Important**: Change the URL format from `postgresql://` to `postgresql+psycopg2://`:
   ```
   postgresql+psycopg2://user:password@host:5432/dbname
   ```

6. Click **"Save"**
7. The backend will auto-redeploy with the database connection

### Step 5: Verify Backend
1. Wait for backend to finish redeploying
2. Visit: `https://ethara-backend.onrender.com/docs`
3. You should see the Swagger API documentation ✅

---

## 🚀 Part 2: Deploy Frontend on Vercel

### Step 1: Create Vercel Account
1. Go to https://vercel.com
2. Sign up with GitHub
3. Authorize Vercel to access your repositories

### Step 2: Import Project
1. Click **"Add New..."** → **"Project"**
2. Find and select **"vaibhavpatil007/etharaAI"**
3. Click **"Import"**

### Step 3: Configure Deployment
1. **Project Name**: Leave as default or change to `ethara-frontend`
2. **Root Directory**: Set to `./frontend`
3. **Build Command**: Already detected as `npm run build`
4. **Install Command**: `npm install`
5. **Start Command**: Leave default

### Step 4: Add Environment Variables
1. Click **"Environment Variables"**
2. Add:
   ```
   Name: VITE_API_URL
   Value: https://ethara-backend.onrender.com
   Environments: Production
   ```

3. Click **"Save"**
4. Click **"Deploy"**
5. Wait for deployment (2-3 minutes)

### Step 5: Verify Frontend
1. Visit your Vercel deployment URL (shown after deployment completes)
2. You should see the Inventory Management dashboard ✅
3. Try navigating to Products and creating a test item
4. If it saves, the backend connection works! ✅

---

## ✅ Deployment Complete!

Your application is now live on free services:

| Component | URL | Provider |
|-----------|-----|----------|
| **Frontend** | https://ethara-frontend.vercel.app | Vercel |
| **Backend API** | https://ethara-backend.onrender.com | Render |
| **API Docs** | https://ethara-backend.onrender.com/docs | Render |
| **Database** | Managed by Render (internal) | Render |

---

## 📋 Troubleshooting

### Backend won't start
1. Check Render logs: Go to backend service → **"Logs"** tab
2. Verify DATABASE_URL format includes `postgresql+psycopg2://`
3. Ensure PostgreSQL service shows "Available" status

### Frontend shows blank page
1. Check Vercel deployment logs
2. Verify VITE_API_URL environment variable is set
3. Open browser console (F12) for errors

### Can't connect backend from frontend
1. Check CORS: Backend should have `ALLOWED_ORIGINS=https://ethara-frontend.vercel.app`
2. Verify VITE_API_URL doesn't have trailing slash
3. Check browser console for CORS error messages

### Database connection timeout
1. Render free tier has limited connections
2. If using from multiple services, connection pool may max out
3. In production, consider upgrading to paid tier

---

## ⚠️ Free Tier Important Notes

### Render Limitations
- **Spins down after 15 minutes of inactivity**: First request takes ~30 seconds to wake up
- **Limited resources**: 0.5 GB RAM may cause issues with large datasets
- **PostgreSQL**: 256 MB storage; 90 days of inactivity = auto-delete
- **No credit card required** for free tier

### Solutions for Spin-Down
- Add a cron job to ping your API every 10 minutes (use external service)
- Upgrade to paid plan ($7/month) for always-on service
- Accept the 30-second cold start delay

### Vercel Notes
- **Always-on**: No spin-down issues
- **Generous free tier**: Unlimited bandwidth, 100 GB storage
- **No cold starts**: Frontend loads instantly

---

## 🚀 To Enable Always-On Render Backend (Optional)

If you want to avoid spin-downs, upgrade Render backend to **Starter** plan ($7/month):
1. Go to Render dashboard → Backend service
2. Click **"Settings"** → **"Change Plan"**
3. Select **"Starter"** ($7/month)
4. This keeps your service always running

---

## 📝 Auto-Deploy on Git Push

Both Render and Vercel support automatic deployment:

1. **Push to GitHub**:
   ```bash
   git add .
   git commit -m "your message"
   git push origin main
   ```

2. **Render** will automatically redeploy backend
3. **Vercel** will automatically redeploy frontend

---

## 🔄 To Update Your Application

After making changes locally:

```bash
# 1. Test locally
npm run dev  # frontend
uvicorn app.main:app --reload  # backend

# 2. Commit and push
git add .
git commit -m "feature: describe your change"
git push origin main

# 3. Services auto-redeploy
# Check Render and Vercel dashboards for deployment status
```

---

## 💡 Production Tips

1. **Monitor Resources**: Check Render/Vercel dashboards regularly
2. **Database Backups**: Render free PostgreSQL auto-deletes after 90 days of inactivity
3. **Upgrade When Ready**: Both services have paid tiers for production use
4. **Custom Domain**: Add your own domain in Render/Vercel settings (future)
5. **Error Monitoring**: Use Sentry (free tier) for error tracking

---

## 📊 Assessment Checklist - Deployment Complete ✅

- ✅ Backend deployed (Render)
- ✅ Frontend deployed (Vercel)
- ✅ PostgreSQL database deployed (Render)
- ✅ Professional UI live
- ✅ Charts and dashboards working
- ✅ CRUD operations functional
- ✅ Free tier deployment
- ✅ Auto-deploy on git push enabled
- ✅ Production-ready configuration

---

## 🎉 Your Application is Live!

**Visit your frontend**: https://ethara-frontend.vercel.app
**API Documentation**: https://ethara-backend.onrender.com/docs

---

**Last Updated**: 2026-06-18
**Status**: ✅ Live on Free Tier
