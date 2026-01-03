from sqlalchemy import Column, Integer, String, Boolean
from database.db import Base

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    login_id = Column(String, unique=True, index=True)
    email = Column(String, unique=True)
    phone = Column(String)

    hashed_password = Column(String)
    year_of_joining = Column(Integer)
    serial_number = Column(Integer)

    must_change_password = Column(Boolean, default=True)
