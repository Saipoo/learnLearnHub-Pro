from fastapi import FastAPI, Depends, HTTPException, status, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from database import connect_to_mongo, close_mongo_connection, get_database
from models import *
from auth import hash_password, verify_password, create_access_token
from dependencies import get_current_user, get_current_user_profile
from bson import ObjectId
from datetime import datetime
from typing import List, Optional
import logging
from seed_data import DUMMY_COURSES, DUMMY_QUIZZES

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = FastAPI(
    title="LearnHub Pro LMS API",
    description="A comprehensive Learning Management System API with authentication, courses, quizzes, and progress tracking",
    version="1.0.0"
)

# CORS configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "https://*.vercel.app"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Startup and shutdown events
@app.on_event("startup")
async def startup_db_client():
    await connect_to_mongo()
    # Seed dummy data if collections are empty
    await seed_dummy_data()

@app.on_event("shutdown")
async def shutdown_db_client():
    await close_mongo_connection()

async def seed_dummy_data():
    """Seed dummy courses and quizzes if database is empty"""
    db = get_database()
    
    # Check if courses already exist
    course_count = await db.courses.count_documents({})
    if course_count == 0:
        logger.info("Seeding dummy courses...")
        course_ids = []
        
        for course_data in DUMMY_COURSES:
            result = await db.courses.insert_one(course_data)
            course_ids.append(result.inserted_id)
            logger.info(f"Created course: {course_data['title']}")
        
        # Seed quizzes for each course
        logger.info("Seeding dummy quizzes...")
        for quiz_data in DUMMY_QUIZZES:
            course_id = course_ids[quiz_data["course_index"]]
            
            # Separate questions from quiz data
            questions = quiz_data.pop("questions")
            quiz_data.pop("course_index")
            quiz_data["course_id"] = str(course_id)
            quiz_data["created_at"] = datetime.utcnow()
            
            # Insert quiz
            quiz_result = await db.quizzes.insert_one(quiz_data)
            quiz_id = quiz_result.inserted_id
            
            # Insert questions
            for question in questions:
                question["quiz_id"] = str(quiz_id)
                await db.quiz_questions.insert_one(question)
            
            logger.info(f"Created quiz for course {quiz_data['course_id']}")
        
        logger.info("Dummy data seeding completed!")

# Health check
@app.get("/")
async def root():
    return {
        "message": "LearnHub Pro LMS API",
        "version": "1.0.0",
        "status": "running"
    }

# ==================== AUTH ROUTES ====================

@app.post("/api/auth/register", response_model=Token, status_code=status.HTTP_201_CREATED)
async def register(user: UserCreate, db = Depends(get_database)):
    """Register a new user"""
    # Check if user already exists
    existing_user = await db.users.find_one({"email": user.email.lower()})
    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email already registered"
        )
    
    # Create new user
    user_data = {
        "email": user.email.lower(),
        "password": hash_password(user.password),
        "profile_completed": False,
        "created_at": datetime.utcnow()
    }
    
    result = await db.users.insert_one(user_data)
    user_id = str(result.inserted_id)
    
    # Create access token
    access_token = create_access_token(data={"sub": user_id})
    
    user_response = UserResponse(
        id=user_id,
        email=user_data["email"],
        profile_completed=user_data["profile_completed"],
        created_at=user_data["created_at"]
    )
    
    return Token(access_token=access_token, user=user_response)

@app.post("/api/auth/login", response_model=Token)
async def login(user: UserLogin, db = Depends(get_database)):
    """Login user"""
    # Find user
    db_user = await db.users.find_one({"email": user.email.lower()})
    if not db_user or not verify_password(user.password, db_user["password"]):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password"
        )
    
    # Create access token
    access_token = create_access_token(data={"sub": str(db_user["_id"])})
    
    user_response = UserResponse(
        id=str(db_user["_id"]),
        email=db_user["email"],
        profile_completed=db_user["profile_completed"],
        created_at=db_user["created_at"]
    )
    
    return Token(access_token=access_token, user=user_response)

@app.get("/api/auth/me", response_model=UserResponse)
async def get_me(current_user = Depends(get_current_user)):
    """Get current user info"""
    return UserResponse(
        id=str(current_user["_id"]),
        email=current_user["email"],
        profile_completed=current_user["profile_completed"],
        created_at=current_user["created_at"]
    )

# ==================== PROFILE ROUTES ====================

@app.post("/api/profile", response_model=ProfileResponse, status_code=status.HTTP_201_CREATED)
async def create_profile(
    profile: ProfileCreate,
    current_user = Depends(get_current_user),
    db = Depends(get_database)
):
    """Create user profile"""
    # Check if profile already exists
    existing_profile = await db.profiles.find_one({"user_id": str(current_user["_id"])})
    if existing_profile:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Profile already exists"
        )
    
    # Create profile
    profile_data = {
        "user_id": str(current_user["_id"]),
        "email": current_user["email"],
        "name": profile.name,
        "mobile_number": profile.mobile_number,
        "dob": profile.dob,
        "bio": profile.bio,
        "profile_picture": profile.profile_picture,
        "profile_completed": True,
        "created_at": datetime.utcnow()
    }
    
    result = await db.profiles.insert_one(profile_data)
    
    # Update user's profile_completed status
    await db.users.update_one(
        {"_id": current_user["_id"]},
        {"$set": {"profile_completed": True}}
    )
    
    return ProfileResponse(
        id=str(result.inserted_id),
        **{k: v for k, v in profile_data.items() if k != "_id"}
    )

@app.get("/api/profile", response_model=ProfileResponse)
async def get_profile(
    current_user = Depends(get_current_user),
    db = Depends(get_database)
):
    """Get user profile"""
    profile = await db.profiles.find_one({"user_id": str(current_user["_id"])})
    if not profile:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Profile not found"
        )
    
    return ProfileResponse(
        id=str(profile["_id"]),
        **{k: v for k, v in profile.items() if k != "_id"}
    )

@app.put("/api/profile", response_model=ProfileResponse)
async def update_profile(
    profile_update: ProfileUpdate,
    current_user = Depends(get_current_user),
    db = Depends(get_database)
):
    """Update user profile"""
    profile = await db.profiles.find_one({"user_id": str(current_user["_id"])})
    if not profile:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Profile not found"
        )
    
    # Update only provided fields
    update_data = {k: v for k, v in profile_update.dict(exclude_unset=True).items() if v is not None}
    
    if update_data:
        await db.profiles.update_one(
            {"user_id": str(current_user["_id"])},
            {"$set": update_data}
        )
    
    updated_profile = await db.profiles.find_one({"user_id": str(current_user["_id"])})
    
    return ProfileResponse(
        id=str(updated_profile["_id"]),
        **{k: v for k, v in updated_profile.items() if k != "_id"}
    )

# ==================== COURSE ROUTES ====================

@app.get("/api/courses", response_model=List[CourseResponse])
async def get_courses(
    skip: int = 0,
    limit: int = 100,
    category: Optional[str] = None,
    db = Depends(get_database)
):
    """Get all courses"""
    query = {}
    if category:
        query["category"] = category
    
    courses = await db.courses.find(query).skip(skip).limit(limit).to_list(length=limit)
    
    return [
        CourseResponse(
            id=str(course["_id"]),
            **{k: v for k, v in course.items() if k != "_id"}
        )
        for course in courses
    ]

@app.get("/api/courses/{course_id}", response_model=CourseResponse)
async def get_course(course_id: str, db = Depends(get_database)):
    """Get course by ID"""
    if not ObjectId.is_valid(course_id):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid course ID"
        )
    
    course = await db.courses.find_one({"_id": ObjectId(course_id)})
    if not course:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Course not found"
        )
    
    return CourseResponse(
        id=str(course["_id"]),
        **{k: v for k, v in course.items() if k != "_id"}
    )

# ==================== ENROLLMENT ROUTES ====================

@app.post("/api/enrollments", response_model=EnrollmentResponse, status_code=status.HTTP_201_CREATED)
async def enroll_course(
    enrollment: EnrollmentCreate,
    current_user = Depends(get_current_user),
    db = Depends(get_database)
):
    """Enroll in a course"""
    # Check if course exists
    if not ObjectId.is_valid(enrollment.course_id):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid course ID"
        )
    
    course = await db.courses.find_one({"_id": ObjectId(enrollment.course_id)})
    if not course:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Course not found"
        )
    
    # Check if already enrolled
    existing = await db.enrollments.find_one({
        "user_id": str(current_user["_id"]),
        "course_id": enrollment.course_id
    })
    
    if existing:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Already enrolled in this course"
        )
    
    # Create enrollment
    enrollment_data = {
        "user_id": str(current_user["_id"]),
        "course_id": enrollment.course_id,
        "progress": 0.0,
        "enrolled_at": datetime.utcnow(),
        "completed": False
    }
    
    result = await db.enrollments.insert_one(enrollment_data)
    
    return EnrollmentResponse(
        id=str(result.inserted_id),
        **enrollment_data
    )

@app.get("/api/enrollments", response_model=List[EnrollmentResponse])
async def get_enrollments(
    current_user = Depends(get_current_user),
    db = Depends(get_database)
):
    """Get user's enrollments"""
    enrollments = await db.enrollments.find(
        {"user_id": str(current_user["_id"])}
    ).to_list(length=100)
    
    return [
        EnrollmentResponse(
            id=str(e["_id"]),
            **{k: v for k, v in e.items() if k != "_id"}
        )
        for e in enrollments
    ]

@app.get("/api/enrollments/{course_id}/status")
async def get_enrollment_status(
    course_id: str,
    current_user = Depends(get_current_user),
    db = Depends(get_database)
):
    """Check if user is enrolled in a course"""
    enrollment = await db.enrollments.find_one({
        "user_id": str(current_user["_id"]),
        "course_id": course_id
    })
    
    return {"enrolled": enrollment is not None}

# ==================== QUIZ ROUTES ====================

@app.get("/api/quizzes/course/{course_id}", response_model=List[QuizResponse])
async def get_course_quizzes(course_id: str, db = Depends(get_database)):
    """Get quizzes for a course"""
    quizzes = await db.quizzes.find({"course_id": course_id}).to_list(length=100)
    
    results = []
    for quiz in quizzes:
        question_count = await db.quiz_questions.count_documents({"quiz_id": str(quiz["_id"])})
        results.append(
            QuizResponse(
                id=str(quiz["_id"]),
                course_id=quiz["course_id"],
                title=quiz["title"],
                description=quiz.get("description"),
                total_questions=question_count,
                passing_score=quiz["passing_score"],
                time_limit=quiz.get("time_limit")
            )
        )
    
    return results

@app.get("/api/quizzes/{quiz_id}")
async def get_quiz(quiz_id: str, db = Depends(get_database)):
    """Get quiz with questions"""
    if not ObjectId.is_valid(quiz_id):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid quiz ID"
        )
    
    quiz = await db.quizzes.find_one({"_id": ObjectId(quiz_id)})
    if not quiz:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Quiz not found"
        )
    
    # Get questions (without showing correct answers)
    questions = await db.quiz_questions.find({"quiz_id": quiz_id}).to_list(length=100)
    
    quiz_questions = []
    for q in questions:
        # Remove is_correct from options for the response
        options = [opt["option"] for opt in q["options"]]
        quiz_questions.append({
            "question": q["question"],
            "options": options
        })
    
    return {
        "id": str(quiz["_id"]),
        "course_id": quiz["course_id"],
        "title": quiz["title"],
        "description": quiz.get("description"),
        "total_questions": len(quiz_questions),
        "passing_score": quiz["passing_score"],
        "time_limit": quiz.get("time_limit"),
        "questions": quiz_questions
    }

@app.post("/api/quizzes/{quiz_id}/attempt")
async def attempt_quiz(
    quiz_id: str,
    attempt: QuizAttempt,
    current_user = Depends(get_current_user),
    db = Depends(get_database)
):
    """Submit quiz attempt and get results"""
    try:
        if not ObjectId.is_valid(quiz_id):
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Invalid quiz ID"
            )
        
        quiz = await db.quizzes.find_one({"_id": ObjectId(quiz_id)})
        if not quiz:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Quiz not found"
            )
        
        # Get questions with correct answers
        questions = await db.quiz_questions.find({"quiz_id": quiz_id}).to_list(length=100)
        
        if len(attempt.answers) != len(questions):
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Number of answers doesn't match number of questions"
            )
        
        # Calculate score
        correct_answers = 0
        for i, question in enumerate(questions):
            user_answer_index = attempt.answers[i]
            if 0 <= user_answer_index < len(question["options"]):
                if question["options"][user_answer_index]["is_correct"]:
                    correct_answers += 1
        
        total_questions = len(questions)
        score = (correct_answers / total_questions) * 100
        passed = score >= quiz["passing_score"]
        
        # Save result
        result_data = {
            "user_id": str(current_user["_id"]),
            "quiz_id": quiz_id,
            "score": score,
            "total_questions": total_questions,
            "correct_answers": correct_answers,
            "passed": passed,
            "attempted_at": datetime.utcnow()
        }
        
        result = await db.quiz_results.insert_one(result_data)
        logger.info(f"Quiz result saved: {result.inserted_id} for user {current_user['_id']}")
        
        # Return as plain JSON
        return JSONResponse(content={
            "id": str(result.inserted_id),
            "user_id": result_data["user_id"],
            "quiz_id": result_data["quiz_id"],
            "score": result_data["score"],
            "total_questions": result_data["total_questions"],
            "correct_answers": result_data["correct_answers"],
            "passed": result_data["passed"],
            "attempted_at": result_data["attempted_at"].isoformat()
        })
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error submitting quiz: {e}", exc_info=True)
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to submit quiz"
        )

@app.get("/api/quizzes/results")
async def get_quiz_results(
    current_user = Depends(get_current_user),
    db = Depends(get_database)
):
    """Get user's recent quiz results"""
    user_id = str(current_user["_id"])
    
    # Get recent quiz results (same as dashboard)
    results = await db.quiz_results.find(
        {"user_id": user_id}
    ).sort("attempted_at", -1).limit(20).to_list(length=20)
    
    # Convert to response format with ISO datetime strings
    response_list = []
    for r in results:
        attempted_at = r.get("attempted_at")
        if isinstance(attempted_at, datetime):
            attempted_at_str = attempted_at.isoformat()
        else:
            attempted_at_str = datetime.utcnow().isoformat()
        
        response_list.append({
            "id": str(r["_id"]),
            "user_id": str(r.get("user_id", "")),
            "quiz_id": str(r.get("quiz_id", "")),
            "score": float(r.get("score", 0)),
            "total_questions": int(r.get("total_questions", 0)),
            "correct_answers": int(r.get("correct_answers", 0)),
            "passed": bool(r.get("passed", False)),
            "attempted_at": attempted_at_str
        })
    
    return JSONResponse(content=response_list)

# ==================== DASHBOARD ROUTES ====================

@app.get("/api/dashboard", response_model=DashboardStats)
async def get_dashboard(
    current_user = Depends(get_current_user),
    db = Depends(get_database)
):
    """Get dashboard statistics"""
    user_id = str(current_user["_id"])
    
    # Get stats
    total_courses = await db.courses.count_documents({})
    enrolled_courses = await db.enrollments.count_documents({"user_id": user_id})
    completed_courses = await db.enrollments.count_documents({
        "user_id": user_id,
        "completed": True
    })
    
    total_quizzes = await db.quizzes.count_documents({})
    attempted_quizzes = await db.quiz_results.count_documents({"user_id": user_id})
    
    # Calculate average score
    results = await db.quiz_results.find({"user_id": user_id}).to_list(length=1000)
    average_score = sum(r["score"] for r in results) / len(results) if results else 0
    
    # Get recent enrollments with course details
    recent_enrollments_data = await db.enrollments.find(
        {"user_id": user_id}
    ).sort("enrolled_at", -1).limit(5).to_list(length=5)
    
    recent_enrollments = []
    for enrollment in recent_enrollments_data:
        course = await db.courses.find_one({"_id": ObjectId(enrollment["course_id"])})
        if course:
            recent_enrollments.append({
                "course_id": enrollment["course_id"],
                "course_title": course["title"],
                "enrolled_at": enrollment["enrolled_at"],
                "progress": enrollment["progress"]
            })
    
    # Get recent quiz results with quiz details
    recent_quiz_results_data = await db.quiz_results.find(
        {"user_id": user_id}
    ).sort("attempted_at", -1).limit(5).to_list(length=5)
    
    recent_quiz_results = []
    for result in recent_quiz_results_data:
        quiz = await db.quizzes.find_one({"_id": ObjectId(result["quiz_id"])})
        if quiz:
            recent_quiz_results.append({
                "quiz_id": result["quiz_id"],
                "quiz_title": quiz["title"],
                "score": result["score"],
                "correct_answers": result.get("correct_answers", 0),
                "total_questions": result.get("total_questions", 0),
                "passed": result["passed"],
                "attempted_at": result["attempted_at"]
            })
    
    return DashboardStats(
        total_courses=total_courses,
        enrolled_courses=enrolled_courses,
        completed_courses=completed_courses,
        total_quizzes=total_quizzes,
        attempted_quizzes=attempted_quizzes,
        average_score=round(average_score, 2),
        recent_enrollments=recent_enrollments,
        recent_quiz_results=recent_quiz_results
    )

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
