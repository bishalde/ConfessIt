# 🚀 Quick Start Guide for ConfessIt

This guide will help you get the ConfessIt application running on your machine in just a few minutes!

## Prerequisites Check

Make sure you have these installed:
- ✅ Node.js (v18 or higher) - [Download](https://nodejs.org/)
- ✅ Python 3.8+ - [Download](https://www.python.org/downloads/)
- ✅ Git (for cloning)

## Step 1: Start the Backend Server

### Option A: Using the start script (Recommended for Mac/Linux)

```bash
cd SERVER
chmod +x start.sh
./start.sh
```

### Option B: Manual setup

```bash
# Navigate to SERVER directory
cd SERVER

# Create virtual environment
python3 -m venv venv

# Activate virtual environment
# On Mac/Linux:
source venv/bin/activate
# On Windows:
venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Run the server
python app.py
```

You should see:
```
 * Running on http://0.0.0.0:5000
```

✅ **Backend is ready!** Keep this terminal window open.

## Step 2: Start the Frontend

Open a **NEW terminal window** and run:

```bash
# Navigate to FRONTEND directory
cd FRONTEND

# Install dependencies (first time only)
npm install

# Start the development server
npm run dev
```

You should see:
```
  ▲ Next.js 13.4.19
  - Local:        http://localhost:3000
```

✅ **Frontend is ready!**

## Step 3: Access the Application

Open your browser and go to:
```
http://localhost:3000
```

You'll be automatically redirected to the login page.

## Step 4: Create Your First Account

1. Click on **"Sign up"**
2. Fill in:
   - Username (e.g., "testuser")
   - Email (e.g., "test@example.com")
   - Password (minimum 6 characters)
   - Confirm Password
3. Click **"Sign Up"**

You'll be automatically logged in and redirected to the home page! 🎉

## What You Can Do Now

### 1. Post a Confession
- Click on "Post" in the navigation
- Choose a category (Love, Work, Family, etc.)
- Write your confession (minimum 10 characters)
- Click "Post Confession"

### 2. Browse Confessions
- Go to "Home" to see all confessions
- Filter by category using the buttons
- Like confessions by clicking the heart icon

### 3. Edit Your Profile
- Click on "Profile" in the navigation
- Click "Edit Profile"
- Update your username, email, or bio
- Click "Save Changes"

## Troubleshooting

### Backend Issues

**Problem**: Module not found errors
```bash
# Make sure you're in the virtual environment
source venv/bin/activate  # Mac/Linux
venv\Scripts\activate     # Windows

# Reinstall dependencies
pip install -r requirements.txt
```

**Problem**: MongoDB connection error
- Check that the MongoDB URI in `.env` is correct
- Ensure you have internet connection (using MongoDB Atlas)

### Frontend Issues

**Problem**: Module not found errors
```bash
# Delete node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

**Problem**: API connection errors
- Make sure the backend server is running on port 5000
- Check that `.env.local` has the correct API URL

**Problem**: Page not loading
```bash
# Clear Next.js cache and restart
rm -rf .next
npm run dev
```

## Default Ports

- **Frontend**: http://localhost:3000
- **Backend**: http://localhost:5000

## Stopping the Servers

To stop either server, press `Ctrl + C` in the terminal window.

## Testing the API

You can test the backend API directly using curl or Postman:

```bash
# Health check
curl http://localhost:5000/api/health

# Should return: {"status": "healthy"}
```

## Next Steps

- Explore all the features!
- Try posting confessions in different categories
- Update your profile
- Browse and like other confessions

## Need Help?

Common issues and solutions:

1. **Port already in use**: 
   - Frontend: Edit `package.json` and change the dev script to use a different port
   - Backend: Change the port in `app.py`

2. **Virtual environment not activating**:
   - Make sure you're in the SERVER directory
   - Try using `python -m venv venv` instead of `python3`

3. **npm install fails**:
   - Try using `npm install --legacy-peer-deps`
   - Or delete `package-lock.json` and try again

Enjoy using ConfessIt! 🎉

---

**Pro Tip**: Open two terminal windows side by side to monitor both frontend and backend logs simultaneously!
