from fastapi import APIRouter
from pydantic import BaseModel
import joblib
import os

router = APIRouter()


# Absolute path to model
BASE_DIR = os.path.dirname(os.path.dirname(os.path.dirname(os.path.dirname(__file__))))

MODEL_PATH = os.path.join(
    BASE_DIR,
    "ml",
    "saved_models",
    "url_detector.pkl"
)

model = joblib.load(MODEL_PATH)


class URLRequest(BaseModel):
    url: str


@router.post("/predict-url")
def predict_url(data: URLRequest):

    prediction = model.predict([data.url])[0]
    probability = model.predict_proba([data.url])[0]

    return {
        "url": data.url,
        "prediction": int(prediction),
        "confidence": float(max(probability))
    }