from fastapi import FastAPI
from api.auth import router
from database.db import Base, engine

Base.metadata.create_all(bind=engine)

app = FastAPI(title="Dayflow HRMS")

app.include_router(router)
