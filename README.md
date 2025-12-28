# ConfessIt - Anonymous Confession Platform

A modern, Instagram-inspired web application where users can share their thoughts and confessions anonymously.

## 🚀 Features

- **User Authentication**: Secure signup, login, and password reset
- **Anonymous Confessions**: Share thoughts with complete anonymity
- **Category Classification**: Organize confessions by category (Love, Work, Family, etc.)
- **Interactive Feed**: Like and browse confessions from others
- **Profile Management**: Update user profile and bio
- **Responsive Design**: Mobile-friendly interface with modern UI

## 📁 Project Structure

```
ConfessIt/
├── FRONTEND/          # Next.js Frontend
│   ├── src/
│   │   ├── app/      # Next.js 13+ App Router pages
│   │   ├── components/  # Reusable React components
│   │   └── utils/    # API utilities and helpers
│   └── public/       # Static assets
│
└── SERVER/           # Flask Backend
    ├── routes/       # API route handlers
    │   ├── auth.py
    │   ├── confessions.py
    │   └── users.py
    └── app.py        # Main Flask application
```

## 🛠️ Tech Stack

### Frontend
- **Next.js 13+** with App Router
- **React 18**
- **Tailwind CSS** for styling
- **Axios** for API calls
- **React Icons** for UI icons
- **Google Fonts** (Poppins, Inter, Playfair Display)

### Backend
- **Python Flask** for REST API
- **MongoDB** for database
- **Flask-JWT-Extended** for authentication
- **Flask-CORS** for cross-origin requests
- **Flask-Bcrypt** for password hashing

## 🚦 Getting Started

### Prerequisites
- Node.js 18+ and npm
- Python 3.8+
- MongoDB Atlas account (or local MongoDB)

### Frontend Setup

1. Navigate to the FRONTEND directory:
```bash
cd FRONTEND
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env.local` file (already created):
```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

4. Run the development server:
```bash
npm run dev
```

The frontend will be available at `http://localhost:3000`

### Backend Setup

1. Navigate to the SERVER directory:
```bash
cd SERVER
```

2. Create a virtual environment:
```bash
python3 -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

3. Install dependencies:
```bash
pip install -r requirements.txt
```

4. The `.env` file is already configured with MongoDB URI

5. Run the Flask server:
```bash
python app.py
```

The backend API will be available at `http://localhost:5000`

## 📱 Pages

1. **Login** (`/login`) - User authentication
2. **Signup** (`/signup`) - New user registration
3. **Forgot Password** (`/forgot-password`) - Password recovery
4. **Home** (`/home`) - Main confession feed with category filters
5. **Post Confession** (`/post`) - Create and share new confessions
6. **Profile** (`/profile`) - View and edit user profile

## 🎨 Design Features

- **Modern UI**: Clean, Instagram-inspired interface
- **Gradient Accents**: Purple to pink gradients for branding
- **Responsive Layout**: Fully mobile-optimized
- **Smooth Animations**: Hover effects and transitions
- **Typography**: Multiple Google Fonts for visual hierarchy

## 🔐 Authentication

- JWT-based authentication
- Secure password hashing with bcrypt
- Token stored in localStorage
- Protected routes with authentication guards

## 📊 Database Schema

### Users Collection
```javascript
{
  _id: ObjectId,
  username: String,
  email: String,
  password: String (hashed),
  bio: String,
  createdAt: Date
}
```

### Confessions Collection
```javascript
{
  _id: ObjectId,
  userId: ObjectId,
  content: String,
  category: String,
  likes: Number,
  likedBy: [String],
  createdAt: Date
}
```

## 🌟 Categories

- 💕 Love - Matters of the heart
- 💼 Work - Professional life
- 👨‍👩‍👧‍👦 Family - Family matters
- 👥 Friendship - Friend stories
- 🤫 Secret - Deepest secrets
- 😔 Regret - Things you wish were different
- 🏆 Achievement - Proud moments
- ✨ Other - Everything else

## 🔧 API Endpoints

### Authentication
- `POST /api/auth/signup` - Register new user
- `POST /api/auth/login` - User login
- `POST /api/auth/forgot-password` - Password reset request

### Confessions
- `GET /api/confessions` - Get all confessions (with pagination & filters)
- `GET /api/confessions/:id` - Get specific confession
- `POST /api/confessions` - Create new confession
- `DELETE /api/confessions/:id` - Delete confession
- `POST /api/confessions/:id/like` - Like/unlike confession

### Users
- `GET /api/users/profile` - Get user profile
- `PUT /api/users/profile` - Update user profile
- `GET /api/users/confessions` - Get user's confessions

## 🚀 Deployment

### Frontend (Vercel)
```bash
cd FRONTEND
vercel
```

### Backend (Heroku/Railway)
```bash
cd SERVER
# Follow platform-specific deployment guides
```

## 📝 Environment Variables

### Frontend (.env.local)
- `NEXT_PUBLIC_API_URL` - Backend API URL

### Backend (.env)
- `SECRET_KEY` - Flask secret key
- `JWT_SECRET_KEY` - JWT signing key
- `MONGODB_URI` - MongoDB connection string

## 🤝 Contributing

This is a learning project. Feel free to fork and modify as needed!

## 📄 License

MIT License - Feel free to use this project for learning purposes.

## 👨‍💻 Author

Built with ❤️ for learning modern web development

---

**Note**: Remember to change the SECRET_KEY and JWT_SECRET_KEY in production!
