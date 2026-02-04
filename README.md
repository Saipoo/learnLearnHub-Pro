# LearnHub Pro - Professional Learning Management System

A comprehensive, full-stack Learning Management System built with Next.js and FastAPI, featuring responsive design, authentication, courses, quizzes, and progress tracking.

## 🚀 Features

- **Authentication System**: Secure JWT-based authentication with bcrypt password hashing
- **Profile Management**: Complete user profiles with avatar support
- **Course Management**: 10+ pre-loaded courses with YouTube video lessons
- **Quiz System**: Interactive MCQ quizzes with auto-evaluation
- **Progress Tracking**: Comprehensive dashboard with learning analytics
- **Fully Responsive**: Mobile-first design with desktop and mobile layouts
- **SEO Optimized**: Built for search engine visibility

## 🛠 Tech Stack

### Frontend
- **Next.js 14** - React framework with SSR
- **TypeScript** - Type-safe development
- **React Icons** - Modern icon library
- **Axios** - HTTP client
- **React Hot Toast** - Toast notifications
- **CSS Modules** - Scoped styling

### Backend
- **FastAPI** - Modern Python API framework
- **MongoDB Atlas** - Cloud database
- **PyMongo & Motor** - MongoDB drivers
- **JWT** - Token-based authentication
- **Bcrypt** - Password hashing
- **Pydantic** - Data validation

## 📋 Prerequisites

- Node.js 18+ and npm/yarn
- Python 3.8+
- MongoDB Atlas account

## 🔧 Installation

### 1. Clone the repository

```bash
cd "poorn's lms"
```

### 2. Backend Setup

```bash
cd backend

# Install Python dependencies
pip install -r requirements.txt

# Configure environment variables
# Edit .env file and add your MongoDB Atlas URI
MONGODB_URI=mongodb+srv://your_username:your_password@cluster.mongodb.net/lms_database?retryWrites=true&w=majority
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production

# Run the backend server
python main.py
```

The backend will run on `http://localhost:8000`

**Important**: The backend will automatically create all MongoDB collections and seed 10 dummy courses with quizzes on first startup!

### 3. Frontend Setup

```bash
cd ../frontend

# Install dependencies
npm install
# or
yarn install

# Configure environment variables (already set)
# .env.local contains:
NEXT_PUBLIC_API_URL=http://localhost:8000

# Run the development server
npm run dev
# or
yarn dev
```

The frontend will run on `http://localhost:3000`

## 🌐 Deployment

### Deploy to Vercel (Frontend)

1. Push your code to GitHub
2. Import project in Vercel
3. Set environment variables:
   ```
   NEXT_PUBLIC_API_URL=https://your-backend-api.com
   NEXT_PUBLIC_SITE_URL=https://learnhub-pro-academy.vercel.app
   ```
4. Deploy!

**Recommended Vercel Domain**: `learnhub-pro-academy.vercel.app`

### Deploy Backend

Deploy to:
- Railway.app
- Render.com
- Heroku
- AWS/DigitalOcean

Update `FRONTEND_URL` in backend `.env` to your Vercel URL.

## 📚 Database Schema

The system automatically creates these collections:
- **users** - User authentication data
- **profiles** - User profile information
- **courses** - Course content and lessons
- **enrollments** - User course enrollments
- **quizzes** - Quiz metadata
- **quiz_questions** - Quiz questions and answers
- **quiz_results** - User quiz attempt results

## 🎓 Pre-loaded Courses

1. Complete Python Programming Masterclass
2. Web Development with React and Next.js
3. Machine Learning Fundamentals
4. Digital Marketing Complete Course
5. Data Structures and Algorithms
6. UI/UX Design Masterclass
7. Cloud Computing with AWS
8. Cybersecurity Fundamentals
9. Mobile App Development with Flutter
10. Blockchain and Cryptocurrency

Each course includes:
- Multiple video lessons (YouTube embedded)
- Course description and metadata
- Category and difficulty level
- Comprehensive quizzes

## 🔐 Security Features

- Password hashing with bcrypt
- JWT token authentication
- Protected API routes
- Input validation
- CORS configuration
- Secure cookie storage

## 📱 Responsive Design

- **Mobile**: Bottom navigation, stacked cards, simplified layout
- **Tablet**: Optimized grid layouts
- **Desktop**: Sidebar navigation, multi-column dashboards

## 🎨 Design Features

- Modern gradient UI
- Smooth animations and transitions
- Card-based layouts
- Progress indicators
- Toast notifications
- Loading states
- Empty states

## 📖 API Documentation

Once the backend is running, visit:
- API Docs: `http://localhost:8000/docs`
- Alternative Docs: `http://localhost:8000/redoc`

## 🔑 Default User Flow

1. **Register**: Create account with email/password
2. **Complete Profile**: Fill in name, mobile, DOB, bio
3. **Dashboard**: View learning progress and statistics
4. **Browse Courses**: Explore available courses
5. **Enroll**: Enroll in courses
6. **Learn**: Watch video lessons
7. **Take Quizzes**: Test knowledge with MCQs
8. **Track Progress**: Monitor learning journey

## 🐛 Troubleshooting

### Backend Issues
- Ensure MongoDB URI is correct
- Check Python version (3.8+)
- Verify all dependencies are installed

### Frontend Issues
- Clear browser cache
- Delete `node_modules` and reinstall
- Check API URL in `.env.local`

### Database Issues
- Verify MongoDB Atlas network access
- Check database user permissions
- Ensure cluster is active

## 📧 Support

For issues and questions:
- Check the documentation
- Review API documentation at `/docs`
- Ensure all environment variables are set correctly

## 🌟 SEO Optimization

The application includes:
- Meta tags for all pages
- Open Graph tags
- Twitter Card tags
- Semantic HTML
- Mobile-friendly design
- Fast loading times
- Sitemap ready

## 📄 License

This project is created for educational purposes.

## 🙏 Acknowledgments

- YouTube for video content hosting
- Unsplash for course thumbnail images
- MongoDB Atlas for database hosting
- Vercel for frontend hosting

---

**Built with ❤️ using Next.js and FastAPI**
