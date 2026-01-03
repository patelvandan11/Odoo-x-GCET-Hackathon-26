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
    login_id, password = create_employee(db, data)
    return {
        "login_id": login_id,
        "temporary_password": password
    }


@router.post("/login")
def login(data: LoginRequest, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.login_id == data.login_id).first()

    if not user or not verify_password(data.password, user.hashed_password):
        raise HTTPException(status_code=401, detail="Invalid credentials")

    return {
        "login_id": user.login_id,
        "must_change_password": user.must_change_password
    }


@router.post("/change-password")
def change_password(login_id: str, data: ChangePassword, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.login_id == login_id).first()

    user.hashed_password = hash_password(data.new_password)
    user.must_change_password = False
    db.commit()

    return {"message": "Password updated successfully"}
