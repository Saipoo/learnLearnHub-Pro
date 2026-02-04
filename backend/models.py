from pydantic import BaseModel, EmailStr, Field, validator
from typing import Optional, List
from datetime import datetime
from bson import ObjectId

class PyObjectId(ObjectId):
    @classmethod
    def __get_validators__(cls):
        yield cls.validate

    @classmethod
    def validate(cls, v):
        if not ObjectId.is_valid(v):
            raise ValueError("Invalid objectid")
        return ObjectId(v)

    @classmethod
    def __modify_schema__(cls, field_schema):
        field_schema.update(type="string")

# User Models
class UserCreate(BaseModel):
    email: EmailStr
    password: str
    
    @validator('password')
    def validate_password(cls, v):
        if len(v) < 6:
            raise ValueError('Password must be at least 6 characters')
        return v

class UserLogin(BaseModel):
    email: EmailStr
    password: str

class UserResponse(BaseModel):
    id: str
    email: str
    profile_completed: bool
    created_at: datetime
    
    class Config:
        json_encoders = {ObjectId: str}

class Token(BaseModel):
    access_token: str
    token_type: str = "bearer"
    user: UserResponse

# Profile Models
class ProfileCreate(BaseModel):
    name: str
    mobile_number: str
    dob: Optional[str] = None
    bio: Optional[str] = None
    profile_picture: Optional[str] = None

class ProfileUpdate(BaseModel):
    name: Optional[str] = None
    mobile_number: Optional[str] = None
    dob: Optional[str] = None
    bio: Optional[str] = None
    profile_picture: Optional[str] = None

class ProfileResponse(BaseModel):
    id: str
    user_id: str
    email: str
    name: str
    mobile_number: str
    dob: Optional[str] = None
    bio: Optional[str] = None
    profile_picture: Optional[str] = None
    profile_completed: bool
    
    class Config:
        json_encoders = {ObjectId: str}

# Course Models
class Lesson(BaseModel):
    title: str
    youtube_url: str
    description: Optional[str] = None
    duration: Optional[str] = None

class Course(BaseModel):
    title: str
    description: str
    thumbnail: Optional[str] = None
    lessons: List[Lesson]
    duration: Optional[str] = None
    level: Optional[str] = "Beginner"
    category: Optional[str] = "General"

class CourseResponse(BaseModel):
    id: str
    title: str
    description: str
    thumbnail: Optional[str] = None
    lessons: List[Lesson]
    duration: Optional[str] = None
    level: Optional[str] = "Beginner"
    category: Optional[str] = "General"
    created_at: datetime
    
    class Config:
        json_encoders = {ObjectId: str}

# Enrollment Models
class EnrollmentCreate(BaseModel):
    course_id: str

class EnrollmentResponse(BaseModel):
    id: str
    user_id: str
    course_id: str
    progress: float = 0.0
    enrolled_at: datetime
    completed: bool = False
    
    class Config:
        json_encoders = {ObjectId: str}

# Quiz Models
class QuizOption(BaseModel):
    option: str
    is_correct: bool

class QuizQuestion(BaseModel):
    question: str
    options: List[QuizOption]
    explanation: Optional[str] = None

class Quiz(BaseModel):
    course_id: str
    title: str
    description: Optional[str] = None
    questions: List[QuizQuestion]
    passing_score: int = 70
    time_limit: Optional[int] = None  # in minutes

class QuizResponse(BaseModel):
    id: str
    course_id: str
    title: str
    description: Optional[str] = None
    total_questions: int
    passing_score: int
    time_limit: Optional[int] = None
    
    class Config:
        json_encoders = {ObjectId: str}

class QuizAttempt(BaseModel):
    quiz_id: str
    answers: List[int]  # List of selected option indexes

class QuizResultResponse(BaseModel):
    id: str
    user_id: str
    quiz_id: str
    score: float
    total_questions: int
    correct_answers: int
    passed: bool
    attempted_at: datetime
    
    class Config:
        json_encoders = {ObjectId: str}

# Dashboard Models
class DashboardStats(BaseModel):
    total_courses: int
    enrolled_courses: int
    completed_courses: int
    total_quizzes: int
    attempted_quizzes: int
    average_score: float
    recent_enrollments: List[dict]
    recent_quiz_results: List[dict]
