from fastapi import APIRouter
from pydantic import BaseModel

import joblib
import os
import pandas as pd

import sys
import os

sys.path.append(
    os.path.abspath(
        os.path.join(
            os.path.dirname(__file__),
            "../../../"
        )
    )
)

from ml.feature_engineering.url_features import (
    extract_url_features
)


router = APIRouter()


BASE_DIR = os.path.dirname(
    os.path.dirname(
        os.path.dirname(
            os.path.dirname(__file__)
        )
    )
)


MODEL_PATH = os.path.join(
    BASE_DIR,
    "ml",
    "saved_models",
    "feature_based_model.pkl"
)


model = joblib.load(MODEL_PATH)


class URLRequest(BaseModel):
    url: str


@router.post("/predict-url")
def predict_url(data: URLRequest):

    try:

        # Extract features
        features = extract_url_features(data.url)

        print(features.keys())

        # Convert to dataframe
        feature_df = pd.DataFrame([features])

        # Prediction
        prediction = model.predict(feature_df)[0]

        # Confidence
        probability = model.predict_proba(
            feature_df
        )[0]

        return {

            "url": data.url,

            "prediction": int(prediction),

            "confidence": float(max(probability)),

            "features": features
        }

    except Exception as e:

        return {
            "error": str(e)
        }
    
    