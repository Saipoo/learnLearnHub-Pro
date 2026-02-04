from motor.motor_asyncio import AsyncIOMotorClient
from pymongo import ASCENDING, DESCENDING
from config import settings
import logging

logger = logging.getLogger(__name__)

class Database:
    client: AsyncIOMotorClient = None
    db = None

db = Database()

async def connect_to_mongo():
    """Connect to MongoDB and create collections if they don't exist"""
    try:
        logger.info("Connecting to MongoDB...")
        db.client = AsyncIOMotorClient(settings.mongodb_uri)
        db.db = db.client.get_database()
        
        # Test connection
        await db.client.admin.command('ping')
        logger.info("Successfully connected to MongoDB!")
        
        # Create collections and indexes
        await create_collections()
        logger.info("Collections and indexes created successfully!")
        
    except Exception as e:
        logger.error(f"Error connecting to MongoDB: {e}")
        raise

async def close_mongo_connection():
    """Close MongoDB connection"""
    if db.client:
        db.client.close()
        logger.info("MongoDB connection closed")

async def create_collections():
    """Create all required collections and indexes"""
    
    # Get existing collections
    existing_collections = await db.db.list_collection_names()
    
    # Define collections to create
    collections = [
        "users",
        "profiles", 
        "courses",
        "enrollments",
        "quizzes",
        "quiz_questions",
        "quiz_results"
    ]
    
    # Create collections if they don't exist
    for collection_name in collections:
        if collection_name not in existing_collections:
            await db.db.create_collection(collection_name)
            logger.info(f"Created collection: {collection_name}")
    
    # Create indexes
    # Users collection
    await db.db.users.create_index([("email", ASCENDING)], unique=True)
    
    # Profiles collection
    await db.db.profiles.create_index([("user_id", ASCENDING)], unique=True)
    
    # Courses collection
    await db.db.courses.create_index([("title", ASCENDING)])
    await db.db.courses.create_index([("created_at", DESCENDING)])
    
    # Enrollments collection
    await db.db.enrollments.create_index([("user_id", ASCENDING), ("course_id", ASCENDING)], unique=True)
    await db.db.enrollments.create_index([("user_id", ASCENDING)])
    await db.db.enrollments.create_index([("course_id", ASCENDING)])
    
    # Quizzes collection
    await db.db.quizzes.create_index([("course_id", ASCENDING)])
    
    # Quiz questions collection
    await db.db.quiz_questions.create_index([("quiz_id", ASCENDING)])
    
    # Quiz results collection
    await db.db.quiz_results.create_index([("user_id", ASCENDING), ("quiz_id", ASCENDING)])
    await db.db.quiz_results.create_index([("user_id", ASCENDING)])
    
    logger.info("Indexes created successfully!")

def get_database():
    return db.db
