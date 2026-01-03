from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from database.db import SessionLocal
from schemas.user import CreateEmployee, LoginRequest, ChangePassword
from services.user_service import create_employee
from models.user import User
from core.security import verify_password, hash_password

router = APIRouter()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.post("/admin/create-employee")
def admin_create_employee(data: CreateEmployee, db: Session = Depends(get_db)):
    login_id, password = create_employee(db, data, is_hr=False)
    return {
        "login_id": login_id,
        "temporary_password": password
    }


@router.post("/hr/signup")
def hr_signup(data: CreateEmployee, db: Session = Depends(get_db)):
    login_id, password = create_employee(db, data, is_hr=True)
    return {
        "login_id": login_id,
        "temporary_password": password,
        "role": "hr"
    }


@router.post("/login")
def login(data: LoginRequest, db: Session = Depends(get_db)):
    if not data.login_id or not data.password:
        raise HTTPException(status_code=401, detail="Login ID and password are required")
    
    # Trim whitespace from login_id
    login_id_clean = data.login_id.strip()
    password_clean = data.password.strip()
    
    user = db.query(User).filter(User.login_id == login_id_clean).first()

    if not user:
        raise HTTPException(status_code=401, detail="Invalid credentials")
    
    if not user.hashed_password:
        raise HTTPException(status_code=401, detail="Invalid credentials")
    
    # Verify password
    if not verify_password(password_clean, user.hashed_password):
        raise HTTPException(status_code=401, detail="Invalid credentials")

    return {
        "login_id": user.login_id,
        "role": user.role or "employee",
        "must_change_password": user.must_change_password
    }


@router.post("/change-password")
def change_password(login_id: str, data: ChangePassword, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.login_id == login_id).first()
    
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    user.hashed_password = hash_password(data.new_password)
    user.must_change_password = False
    db.commit()
    db.refresh(user)

    return {"message": "Password updated successfully"}


@router.get("/user/me")
def get_current_user(login_id: str, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.login_id == login_id).first()
    
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    return {
        "login_id": user.login_id,
        "name": user.name or "",
        "email": user.email,
        "phone": user.phone,
        "company_name": user.company_name,
        "role": user.role or "employee",
        "year_of_joining": user.year_of_joining
    }
