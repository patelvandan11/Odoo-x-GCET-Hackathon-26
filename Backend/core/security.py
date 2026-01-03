from passlib.context import CryptContext

pwd_context = CryptContext(
    schemes=["bcrypt"],
    deprecated="auto",
    bcrypt__rounds=12
)

def hash_password(password: str) -> str:
    if not password:
        raise ValueError("Password cannot be empty")
    # Don't truncate password - let bcrypt handle it
    return pwd_context.hash(password)

def verify_password(password: str, hashed: str) -> bool:
    if not password or not hashed:
        return False
    try:
        return pwd_context.verify(password, hashed)
    except Exception:
        return False
