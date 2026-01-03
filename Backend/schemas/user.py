from pydantic import BaseModel

class CreateEmployee(BaseModel):
    company_name: str
    name: str  # Full name (will be split into first and last)
    email: str
    phone: str
    year_of_joining: int

class LoginRequest(BaseModel):
    login_id: str
    password: str

class ChangePassword(BaseModel):
    new_password: str
