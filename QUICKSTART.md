# LearnHub Pro - Quick Start Guide

## 🚀 Getting Started in 3 Steps

### Step 1: Setup Backend
```bash
cd backend
pip install -r requirements.txt
```

Edit `backend/.env` with your MongoDB URI:
```
MONGODB_URI=your_mongodb_atlas_uri_here
```

Run backend:
```bash
python main.py
```

Backend runs on http://localhost:8000

### Step 2: Setup Frontend
```bash
cd frontend
npm install
npm run dev
```

Frontend runs on http://localhost:3000

### Step 3: Use the Application
1. Open http://localhost:3000
2. Click "Get Started Free"
3. Register with email/password
4. Complete your profile
5. Start learning!

## ✨ What's Included?

- ✅ 10 Complete Courses
- ✅ 10 Interactive Quizzes
- ✅ YouTube Video Lessons
- ✅ Progress Tracking
- ✅ Responsive Design
- ✅ Authentication System

## 🔑 Important Notes

1. **MongoDB Atlas**: Get your connection URI from MongoDB Atlas
2. **Auto-Setup**: Database collections are created automatically
3. **Dummy Data**: 10 courses with quizzes are seeded on first run
4. **SEO Ready**: Optimized for search engines

## 📱 Responsive Features

**Desktop**: Sidebar navigation, multi-column layout
**Mobile**: Bottom nav, stacked cards, touch-friendly

## 🌐 Deployment

**Frontend**: Deploy to Vercel
**Backend**: Deploy to Railway/Render
**Domain**: learnhub-pro-academy.vercel.app

## 📚 Available Routes

- `/` - Landing page
- `/register` - Sign up
- `/login` - Sign in
- `/dashboard` - Main dashboard
- `/courses` - Course catalog
- `/courses/[id]` - Course details
- `/quizzes` - Quiz results
- `/quizzes/[id]` - Take quiz
- `/profile` - Edit profile

## 🎯 Key Features

1. **JWT Authentication**: Secure login system
2. **Profile System**: Complete user profiles
3. **Course Enrollment**: Track enrolled courses
4. **Quiz System**: MCQ questions with instant results
5. **Progress Tracking**: Dashboard analytics
6. **Responsive Design**: Works on all devices

## 🐛 Common Issues

**Backend won't start**: Check MongoDB URI
**Frontend errors**: Run `npm install` again
**Can't login**: Clear browser cookies

## 📞 Need Help?

1. Check README.md for detailed docs
2. Visit http://localhost:8000/docs for API docs
3. Ensure all .env variables are set

---

**Happy Learning! 🎓**
