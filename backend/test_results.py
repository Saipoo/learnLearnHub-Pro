import asyncio
from motor.motor_asyncio import AsyncIOMotorClient
from config import settings

async def check_results():
    client = AsyncIOMotorClient(settings.mongodb_uri)
    db = client.get_database()
    
    results = await db.quiz_results.find({}).to_list(length=10)
    print(f'Total quiz results in DB: {len(results)}')
    
    for r in results:
        print(f"\nResult ID: {r.get('_id')}")
        print(f"User ID: {r.get('user_id')}")
        print(f"Quiz ID: {r.get('quiz_id')}")
        print(f"Score: {r.get('score')}")
        print(f"Attempted at: {r.get('attempted_at')}")
        print(f"All fields: {r.keys()}")

if __name__ == "__main__":
    asyncio.run(check_results())
