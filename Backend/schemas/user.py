from pydantic import BaseModel

class CreateEmployee(BaseModel):
    first_name: str
    last_name: str
    email: str
    phone: str
    year_of_joining: int

class LoginRequest(BaseModel):
    login_id: str
    password: str

class ChangePassword(BaseModel):
    new_password: str
