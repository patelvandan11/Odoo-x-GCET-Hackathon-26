from sqlalchemy.orm import Session
from models.user import User
from utils.login_id import generate_login_id
from utils.password import generate_password
from core.security import hash_password, verify_password

def create_employee(db: Session, data, is_hr: bool = False):
    last_user = (
        db.query(User)
        .filter(User.year_of_joining == data.year_of_joining)
        .order_by(User.serial_number.desc())
        .first()
    )

    serial = 1 if not last_user else last_user.serial_number + 1

    # Split name into first and last
    name_parts = data.name.strip().split(maxsplit=1)
    first_name = name_parts[0] if name_parts else ""
    last_name = name_parts[1] if len(name_parts) > 1 else ""

    login_id = generate_login_id(
        data.company_name,
        first_name,
        last_name,
        data.year_of_joining,
        serial
    )

    raw_password = generate_password()
    hashed_pwd = hash_password(raw_password)
    
    # Ensure password is hashed correctly
    if not hashed_pwd:
        raise Exception("Failed to hash password")

    user = User(
        login_id=login_id,
        name=data.name.strip(),  # Store full name
        email=data.email,
        phone=data.phone,
        company_name=data.company_name,
        role="hr" if is_hr else "employee",
        year_of_joining=data.year_of_joining,
        serial_number=serial,
        hashed_password=hashed_pwd,
        must_change_password=True
    )

    db.add(user)
    db.commit()
    db.refresh(user)
    
    # Verify the password was saved and can be verified
    if not user.hashed_password:
        raise Exception("Password was not saved correctly")
    
    # Test that the saved password can be verified
    if not verify_password(raw_password, user.hashed_password):
        raise Exception("Password verification failed after saving")

    return login_id, raw_password
