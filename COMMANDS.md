# 🔥 Useful Commands for ConfessIt

Quick reference guide for common commands and operations.

---

## 🚀 Starting the Application

### Backend (Choose one method)

**Mac/Linux (Recommended):**
```bash
cd SERVER
chmod +x start.sh
./start.sh
```

**Windows:**
```cmd
cd SERVER
start.bat
```

**Manual Start:**
```bash
cd SERVER
source venv/bin/activate  # Mac/Linux
venv\Scripts\activate     # Windows
python app.py
```

### Frontend

```bash
cd FRONTEND
npm run dev
```

---

## 📦 Installation Commands

### Backend Dependencies

```bash
cd SERVER

# Create virtual environment
python3 -m venv venv

# Activate virtual environment
source venv/bin/activate  # Mac/Linux
venv\Scripts\activate     # Windows

# Install all dependencies
pip install -r requirements.txt

# Install individual package
pip install flask
```

### Frontend Dependencies

```bash
cd FRONTEND

# Install all dependencies
npm install

# Install with legacy peer deps (if errors)
npm install --legacy-peer-deps

# Install individual package
npm install axios
```

---

## 🔧 Development Commands

### Backend

```bash
# Check Python version
python3 --version

# Check installed packages
pip list

# Freeze dependencies
pip freeze > requirements.txt

# Run Flask server
python app.py

# Run on different port
python app.py --port 5001

# Check if virtual env is active
which python  # Should show venv path
```

### Frontend

```bash
# Check Node version
node --version

# Check npm version
npm --version

# Start dev server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linter
npm run lint

# Clear Next.js cache
rm -rf .next
```

---

## 🧹 Cleanup Commands

### Backend

```bash
cd SERVER

# Remove virtual environment
rm -rf venv

# Remove Python cache
find . -type d -name "__pycache__" -exec rm -rf {} +
find . -type f -name "*.pyc" -delete

# Deactivate virtual environment
deactivate
```

### Frontend

```bash
cd FRONTEND

# Remove node_modules
rm -rf node_modules

# Remove package-lock
rm package-lock.json

# Remove Next.js cache
rm -rf .next

# Clean install
rm -rf node_modules package-lock.json
npm install
```

---

## 🔍 Testing & Debugging

### Backend API Tests

```bash
# Health check
curl http://localhost:5000/api/health

# Test signup (replace with your data)
curl -X POST http://localhost:5000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{"username":"testuser","email":"test@test.com","password":"test123"}'

# Test login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@test.com","password":"test123"}'

# Test get confessions (replace TOKEN)
curl http://localhost:5000/api/confessions \
  -H "Authorization: Bearer YOUR_TOKEN"
```

### Frontend Testing

```bash
# Open in browser
open http://localhost:3000

# Check for errors in browser console
# Press F12 -> Console tab

# Check network requests
# Press F12 -> Network tab
```

---

## 🐛 Troubleshooting Commands

### Port Already in Use

**Backend (Port 5000):**
```bash
# Find process using port 5000
lsof -i :5000          # Mac/Linux
netstat -ano | findstr :5000  # Windows

# Kill process
kill -9 <PID>          # Mac/Linux
taskkill /PID <PID> /F # Windows
```

**Frontend (Port 3000):**
```bash
# Find process using port 3000
lsof -i :3000          # Mac/Linux
netstat -ano | findstr :3000  # Windows

# Kill process
kill -9 <PID>          # Mac/Linux
taskkill /PID <PID> /F # Windows
```

### Reset Everything

```bash
# Backend
cd SERVER
deactivate  # if venv is active
rm -rf venv
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt

# Frontend
cd FRONTEND
rm -rf node_modules .next package-lock.json
npm install
```

---

## 📊 Database Commands

### MongoDB Connection Test

```bash
# Test MongoDB connection with Python
python3 -c "from pymongo import MongoClient; client = MongoClient('mongodb+srv://bishalde:bishalde5741@confessitdb.bk2w8ll.mongodb.net/?appName=ConfessItDb'); print('Connected:', client.server_info())"
```

### Create Database Indexes

```bash
cd SERVER
source venv/bin/activate
python db_utils.py
```

---

## 🔐 Environment Variables

### View Environment Variables

**Backend:**
```bash
cd SERVER
cat .env  # Mac/Linux
type .env # Windows
```

**Frontend:**
```bash
cd FRONTEND
cat .env.local  # Mac/Linux
type .env.local # Windows
```

### Edit Environment Variables

```bash
# Use your preferred editor
nano .env        # Nano editor
vim .env         # Vim editor
code .env        # VS Code
```

---

## 📝 Git Commands (Optional)

```bash
# Initialize git repository
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit: ConfessIt project"

# Add remote
git remote add origin <your-repo-url>

# Push to GitHub
git push -u origin main
```

---

## 🔄 Update Dependencies

### Backend

```bash
cd SERVER
source venv/bin/activate

# Update all packages
pip install --upgrade -r requirements.txt

# Update specific package
pip install --upgrade flask
```

### Frontend

```bash
cd FRONTEND

# Check for outdated packages
npm outdated

# Update all packages
npm update

# Update specific package
npm install react@latest
```

---

## 📈 Performance & Optimization

### Frontend Build Analysis

```bash
cd FRONTEND

# Build and analyze
npm run build

# Check build size
du -sh .next

# Analyze bundle size (if configured)
npm run analyze
```

### Backend Performance

```bash
# Check Python package sizes
pip list --format=columns

# Profile Python script
python -m cProfile app.py
```

---

## 🚢 Deployment Commands

### Frontend (Vercel)

```bash
cd FRONTEND

# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Production deploy
vercel --prod
```

### Backend (Heroku)

```bash
cd SERVER

# Login to Heroku
heroku login

# Create app
heroku create confessit-api

# Deploy
git push heroku main

# View logs
heroku logs --tail
```

---

## 🔍 Logs & Monitoring

### View Logs

**Backend:**
```bash
# Terminal logs (automatically shown when running)
python app.py

# Save logs to file
python app.py > logs.txt 2>&1
```

**Frontend:**
```bash
# Terminal logs (automatically shown)
npm run dev

# Save to file
npm run dev > logs.txt 2>&1
```

### Monitor Processes

```bash
# Check running processes
ps aux | grep python  # Backend
ps aux | grep node    # Frontend

# Monitor in real-time
top                   # Mac/Linux
tasklist              # Windows
```

---

## 💡 Useful Tips

### Multiple Terminal Windows

```bash
# Terminal 1: Backend
cd SERVER && ./start.sh

# Terminal 2: Frontend
cd FRONTEND && npm run dev

# Terminal 3: Testing
curl http://localhost:5000/api/health
```

### Quick Restart

```bash
# Stop servers: Ctrl + C in each terminal

# Restart backend
cd SERVER && python app.py

# Restart frontend
cd FRONTEND && npm run dev
```

---

## 🎯 Common Workflows

### Make Changes to Frontend

```bash
1. Edit file in src/
2. Save (auto-reload in browser)
3. Check browser console for errors
4. Test functionality
```

### Make Changes to Backend

```bash
1. Edit file in routes/ or app.py
2. Stop server (Ctrl + C)
3. Restart: python app.py
4. Test with curl or from frontend
```

### Add New API Endpoint

```bash
1. Add function in routes/*.py
2. Test with curl
3. Update frontend api.js
4. Use in component
```

---

**Pro Tips:**
- Use `Ctrl + C` to stop any running process
- Use `Ctrl + Z` to suspend (then `fg` to resume)
- Use `clear` to clean terminal
- Use `history` to see previous commands
- Use arrow keys ↑↓ to navigate command history

---

**Last Updated**: December 28, 2025
