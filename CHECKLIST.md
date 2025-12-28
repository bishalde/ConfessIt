# ✅ Setup Checklist for ConfessIt

Use this checklist to ensure everything is set up correctly!

## 📋 Pre-Setup Checklist

- [ ] Node.js installed (v18+) - Check: `node --version`
- [ ] Python installed (3.8+) - Check: `python3 --version` or `python --version`
- [ ] npm installed - Check: `npm --version`
- [ ] Internet connection (for MongoDB Atlas)

---

## 🔧 Backend Setup Checklist

### 1. Environment Setup
- [ ] Navigated to `SERVER` directory
- [ ] Created virtual environment (`python3 -m venv venv`)
- [ ] Activated virtual environment
  - Mac/Linux: `source venv/bin/activate`
  - Windows: `venv\Scripts\activate`
- [ ] Installed dependencies (`pip install -r requirements.txt`)

### 2. Configuration Files
- [ ] `.env` file exists with MongoDB URI
- [ ] MongoDB connection string is correct
- [ ] All required packages installed without errors

### 3. Start Backend
- [ ] Run `python app.py`
- [ ] Server starts without errors
- [ ] See message: "Running on http://0.0.0.0:5000"
- [ ] Can access http://localhost:5000 in browser
- [ ] Health check works: http://localhost:5000/api/health

---

## 🎨 Frontend Setup Checklist

### 1. Dependencies Installation
- [ ] Navigated to `FRONTEND` directory
- [ ] Ran `npm install`
- [ ] All packages installed successfully
- [ ] No critical errors in installation

### 2. Configuration Files
- [ ] `.env.local` file exists
- [ ] `NEXT_PUBLIC_API_URL=http://localhost:5000/api` is set
- [ ] `tailwind.config.js` exists
- [ ] `postcss.config.js` exists

### 3. Start Frontend
- [ ] Run `npm run dev`
- [ ] Development server starts
- [ ] See message: "ready - started server on 0.0.0.0:3000"
- [ ] No compilation errors
- [ ] Can access http://localhost:3000

---

## 🧪 Testing Checklist

### 1. Authentication Flow
- [ ] Can access login page (http://localhost:3000/login)
- [ ] Can click "Sign up" link
- [ ] Can create new account with:
  - [ ] Username
  - [ ] Email
  - [ ] Password (6+ characters)
- [ ] After signup, redirected to /home
- [ ] Can logout
- [ ] Can login with created credentials

### 2. Confession Features
- [ ] Can access home page (/home)
- [ ] Can see navigation bar
- [ ] Can click "Post" to create confession
- [ ] Can select a category
- [ ] Can write confession (10+ characters)
- [ ] Can submit confession
- [ ] Redirected to home after posting
- [ ] Can see posted confession in feed
- [ ] Can like confessions (heart icon works)
- [ ] Can delete own confessions

### 3. Profile Features
- [ ] Can access profile page
- [ ] Can see current profile info
- [ ] Can click "Edit Profile"
- [ ] Can update username
- [ ] Can update email
- [ ] Can add/edit bio
- [ ] Changes save successfully
- [ ] See success message after saving

### 4. Navigation & UI
- [ ] Navbar displays on all pages
- [ ] Navigation links work (Home, Post, Profile)
- [ ] Logout works
- [ ] After logout, redirected to login
- [ ] Protected routes redirect to login when not authenticated
- [ ] Responsive design works on mobile (resize browser)
- [ ] All buttons have hover effects
- [ ] Forms show validation errors

### 5. Category Filtering
- [ ] Can see category filter buttons on home page
- [ ] Can filter by each category:
  - [ ] Love
  - [ ] Work
  - [ ] Family
  - [ ] Friendship
  - [ ] Secret
  - [ ] Regret
  - [ ] Achievement
  - [ ] Other
- [ ] "All" button shows all confessions

---

## 🐛 Troubleshooting Checklist

If something doesn't work, check:

### Backend Issues
- [ ] Virtual environment is activated (you see `(venv)` in terminal)
- [ ] All dependencies installed (`pip list` shows flask, pymongo, etc.)
- [ ] Port 5000 is not in use by another app
- [ ] MongoDB URI is correct and has network access
- [ ] No syntax errors in Python files
- [ ] Can import all required modules

### Frontend Issues
- [ ] `node_modules` folder exists
- [ ] `.env.local` file has correct API URL
- [ ] Port 3000 is not in use
- [ ] Browser console shows no errors (F12 -> Console)
- [ ] Network requests going to correct URL (F12 -> Network)
- [ ] Tailwind CSS is working (styles are applied)

### Connection Issues
- [ ] Backend is running before starting frontend
- [ ] Both servers on same machine/network
- [ ] No CORS errors in browser console
- [ ] API requests show in backend terminal logs

---

## ✨ Quality Checklist

- [ ] No console errors in browser
- [ ] No terminal errors in backend
- [ ] All pages load quickly
- [ ] UI looks clean and modern
- [ ] Mobile view is responsive
- [ ] Forms validate properly
- [ ] Error messages are clear
- [ ] Success messages display
- [ ] Loading states show when appropriate

---

## 🎉 Final Checklist

- [ ] Can create multiple accounts
- [ ] Can post multiple confessions
- [ ] Can browse all confessions
- [ ] Can filter by categories
- [ ] Can like/unlike confessions
- [ ] Can delete own confessions
- [ ] Can edit profile
- [ ] Can logout and login again
- [ ] Everything works smoothly!

---

## 📸 Screenshot Checklist (Optional)

Take screenshots of:
- [ ] Login page
- [ ] Signup page
- [ ] Home feed with confessions
- [ ] Post confession page with categories
- [ ] Profile edit page
- [ ] Mobile responsive view

---

## 🚀 Deployment Checklist (Optional)

If deploying to production:
- [ ] Update SECRET_KEY in backend .env
- [ ] Update JWT_SECRET_KEY in backend .env
- [ ] Update NEXT_PUBLIC_API_URL to production URL
- [ ] Test all features in production
- [ ] Set up proper environment variables
- [ ] Enable HTTPS

---

## ✅ Completion Status

Total Items: 100+
Completed: ____

**Status**: 
- [ ] All critical features working
- [ ] Ready for use
- [ ] Ready for deployment

---

**Last Updated**: December 28, 2025

**Notes**:
_Add any issues or observations here_

---

🎊 **Congratulations!** If all items are checked, your ConfessIt application is fully functional!
