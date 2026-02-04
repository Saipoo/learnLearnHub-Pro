from passlib.context import CryptContext
from jose import JWTError, jwt
from datetime import datetime, timedelta
from config import settings
from fastapi import HTTPException, status
from typing import Optional
import hashlib

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def _pre_hash_password(password: str) -> str:
    """Pre-hash password with SHA256 to handle bcrypt's 72-byte limit"""
    return hashlib.sha256(password.encode('utf-8')).hexdigest()

def hash_password(password: str) -> str:
    """Hash a password using SHA256 + bcrypt"""
    pre_hashed = _pre_hash_password(password)
    return pwd_context.hash(pre_hashed)

def verify_password(plain_password: str, hashed_password: str) -> bool:
    """Verify a password against its hash"""
    pre_hashed = _pre_hash_password(plain_password)
    return pwd_context.verify(pre_hashed, hashed_password)

def create_access_token(data: dict, expires_delta: Optional[timedelta] = None) -> str:
    """Create a JWT access token"""
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=settings.jwt_expiration_minutes)
    
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, settings.jwt_secret, algorithm=settings.jwt_algorithm)
    return encoded_jwt

def verify_token(token: str) -> dict:
    """Verify and decode a JWT token"""
    try:
        payload = jwt.decode(token, settings.jwt_secret, algorithms=[settings.jwt_algorithm])
        return payload
    except JWTError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Could not validate credentials",
            headers={"WWW-Authenticate": "Bearer"},
        )
