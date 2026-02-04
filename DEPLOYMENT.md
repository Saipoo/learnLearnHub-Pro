# LearnHub Pro - Backend Deployment Guide

## Deploy to Render

### Prerequisites
- MongoDB Atlas account with a cluster set up
- Render account

### Deployment Steps

1. **Push your code to GitHub** (already done)

2. **Create a new Web Service on Render**
   - Go to [Render Dashboard](https://dashboard.render.com/)
   - Click "New +" → "Web Service"
   - Connect your GitHub repository: `https://github.com/Saipoo/learnLearnHub-Pro.git`

3. **Configure the service**
   - **Name**: `learnhub-backend`
   - **Region**: Choose closest to you
   - **Branch**: `main`
   - **Root Directory**: `backend`
   - **Runtime**: `Python 3`
   - **Python Version**: `3.11.9` (Important!)
   - **Build Command**: `pip install --upgrade pip setuptools wheel && pip install --only-binary=:all: -r requirements.txt || pip install -r requirements.txt`
   - **Start Command**: `uvicorn main:app --host 0.0.0.0 --port $PORT`

4. **Environment Variables** (Add these in Render dashboard)
   ```
   MONGODB_URI=your_mongodb_atlas_connection_string
   JWT_SECRET=your-super-secret-jwt-key-minimum-32-characters
   JWT_ALGORITHM=HS256
   JWT_EXPIRATION_MINUTES=10080
   FRONTEND_URL=https://learnhub-pro-academy.vercel.app
   PYTHON_VERSION=3.11.9
   ```

5. **MongoDB Atlas Setup**
   - Go to MongoDB Atlas → Network Access
   - Add IP Address: `0.0.0.0/0` (Allow access from anywhere)
   - Or get Render's IP addresses and whitelist them

6. **Deploy**
   - Click "Create Web Service"
   - Wait for deployment to complete
   - Copy your backend URL (e.g., `https://learnhub-backend.onrender.com`)

7. **Update Frontend Environment**
   - In your frontend `.env.local`, update:
   ```
   NEXT_PUBLIC_API_URL=https://your-backend-url.onrender.com
   ```

## Troubleshooting

### Build Fails with Python Version Error
- Ensure `runtime.txt` is in the backend folder
- Ensure it specifies `python-3.11.9`

### MongoDB Connection Error
- Verify MONGODB_URI is correct
- Check MongoDB Atlas Network Access allows Render IPs
- Ensure database user has correct permissions

### Import Errors
- Check all dependencies in `requirements.txt`
- Ensure Python version is compatible (3.11.9)

### CORS Errors
- Verify FRONTEND_URL in backend environment variables
- Check frontend is using correct API URL

## Local Development

```bash
cd backend
python -m venv .venv
.venv\Scripts\activate  # Windows
pip install -r requirements.txt
uvicorn main:app --reload
```
