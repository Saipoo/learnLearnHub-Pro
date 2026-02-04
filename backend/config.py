from pydantic_settings import BaseSettings
from typing import Optional

class Settings(BaseSettings):
    mongodb_uri: str
    jwt_secret: str
    jwt_algorithm: str = "HS256"
    jwt_expiration_minutes: int = 10080  # 7 days
    frontend_url: str = "http://localhost:3000"
    
    class Config:
        env_file = ".env"
        case_sensitive = False

settings = Settings()
