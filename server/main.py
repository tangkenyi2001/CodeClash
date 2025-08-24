from typing import Union
import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers import home, auth
from database import engine, Base

Base.metadata.create_all(bind=engine)

app = FastAPI()

app.include_router(home.router)
app.include_router(auth.router, prefix="/auth", tags=["auth"])

origins = [
    "http://localhost:3000",  # React dev server
    "http://127.0.0.1:3000"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,        # which origins are allowed
    allow_credentials=True,
    allow_methods=["*"],          # allow all methods: GET, POST, etc.
    allow_headers=["*"],          # allow all headers
)

@app.get("/")
def root():
    return {"message": "🚀 API is running!"}


if __name__ == "__main__":
    uvicorn.run("main:app", host="127.0.0.1", port=8000, reload=True)
