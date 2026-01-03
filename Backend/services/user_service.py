from sqlalchemy.orm import Session
from models.user import User
from utils.login_id import generate_login_id
from utils.password import generate_password
from core.security import hash_password

def create_employee(db: Session, data):
    last_user = (
        db.query(User)
        .filter(User.year_of_joining == data.year_of_joining)
        .order_by(User.serial_number.desc())
        .first()
    )

    serial = 1 if not last_user else last_user.serial_number + 1

    login_id = generate_login_id(
        data.first_name,
        data.last_name,
        data.year_of_joining,
        serial
    )

    raw_password = generate_password()

    user = User(
        login_id=login_id,
        email=data.email,
        phone=data.phone,
        year_of_joining=data.year_of_joining,
        serial_number=serial,
        hashed_password=hash_password(raw_password),
        must_change_password=True
    )

    db.add(user)
    db.commit()
    db.refresh(user)

    return login_id, raw_password
