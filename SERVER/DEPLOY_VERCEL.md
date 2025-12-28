# Vercel Deployment Guide for ConfessIt Backend

## Steps to Deploy on Vercel:

### 1. **Sign up/Login to Vercel**
   - Go to https://vercel.com
   - Click "Sign Up" (or "Login" if you have an account)
   - Use GitHub, GitLab, or Bitbucket to sign in

### 2. **Push Your Code to GitHub**
   
   If you haven't already, initialize git in your SERVER folder:
   
   ```bash
   cd SERVER
   git init
   git add .
   git commit -m "Initial commit"
   ```
   
   Create a new repository on GitHub and push:
   
   ```bash
   git remote add origin YOUR_GITHUB_REPO_URL
   git branch -M main
   git push -u origin main
   ```

### 3. **Import Project to Vercel (UI Steps)**

   1. **Click "Add New"** in Vercel Dashboard
      - Top right corner → Click "Add New..." → Select "Project"
   
   2. **Import Git Repository**
      - Click "Import Git Repository"
      - Find your repository in the list
      - Click "Import"
   
   3. **Configure Project**
      - **Project Name**: confessit-backend (or your choice)
      - **Framework Preset**: Select "Other"
      - **Root Directory**: Click "Edit" → Select "SERVER"
      - **Build Command**: Leave empty (no build needed)
      - **Output Directory**: Leave as default
   
   4. **Environment Variables**
      Click "Add" to add these variables:
      
      ```
      SECRET_KEY=your-secret-key-change-in-production-vercel
      JWT_SECRET_KEY=jwt-secret-key-change-in-production-vercel
      MONGODB_URI=mongodb+srv://bishalde:bishalde5741@confessitdb.bk2w8ll.mongodb.net/?appName=ConfessItDb
      ```
   
   5. **Deploy**
      - Click "Deploy" button
      - Wait for deployment to complete (2-3 minutes)

### 4. **Get Your Deployment URL**
   - After deployment, you'll see a URL like: `https://confessit-backend.vercel.app`
   - Copy this URL

### 5. **Update Frontend Environment Variable**
   
   Update your FRONTEND/.env.local:
   ```
   NEXT_PUBLIC_API_URL=https://your-backend-url.vercel.app/api
   ```

### 6. **Test Your API**
   Visit: `https://your-backend-url.vercel.app/api/health`
   
   Should return: `{"status": "healthy"}`

---

## Important Notes:

⚠️ **Vercel has limitations for Python apps:**
- 50 second timeout per request
- Limited to serverless functions
- Better alternatives: Railway.app or Render.com

⚠️ **For production, consider:**
1. **Railway.app** (Recommended for Flask)
2. **Render.com**
3. **Heroku**

These platforms are better suited for Flask applications.

---

## Alternative: Deploy to Railway (Better for Flask)

### Railway.app Steps:

1. Go to https://railway.app
2. Sign up with GitHub
3. Click "New Project"
4. Select "Deploy from GitHub repo"
5. Select your repository
6. Railway auto-detects Python
7. Add environment variables in the dashboard
8. Deploy!

Railway provides:
✅ Better Python support
✅ No timeout limits
✅ Easier configuration
✅ Free tier available

---

## Troubleshooting Vercel Deployment:

If deployment fails:
1. Check build logs in Vercel dashboard
2. Ensure all dependencies are in requirements.txt
3. Check Python version compatibility
4. Verify environment variables are set correctly
