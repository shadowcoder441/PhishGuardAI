from fastapi import FastAPI
from app.api.predict import router as predict_router

app = FastAPI(title="PhishGuard AI")

app.include_router(predict_router)