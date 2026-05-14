import pandas as pd

from sklearn.model_selection import train_test_split
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression
from sklearn.pipeline import Pipeline
from sklearn.metrics import classification_report

import joblib


# Load dataset
data = pd.read_csv("datasets/phishing_urls.csv")


# Features and labels
X = data["url"]
y = data["label"]


# Split dataset
X_train, X_test, y_train, y_test = train_test_split(
    X,
    y,
    test_size=0.2,
    random_state=42
)


# ML Pipeline
pipeline = Pipeline([
    ("tfidf", TfidfVectorizer()),
    ("model", LogisticRegression())
])


# Train model
pipeline.fit(X_train, y_train)


# Predictions
predictions = pipeline.predict(X_test)


# Evaluation
print(classification_report(y_test, predictions))


# Save model
joblib.dump(
    pipeline,
    "ml/saved_models/url_detector.pkl"
)

print("Model trained and saved successfully")