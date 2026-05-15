import pandas as pd
import joblib

from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score


# Load dataset
data = pd.read_csv(
    "datasets/phishing_urls.csv",
    sep="\t"
)


# Features and target
X = data.drop("target", axis=1)

y = data["target"]


# Train-test split
X_train, X_test, y_train, y_test = train_test_split(
    X,
    y,
    test_size=0.2,
    random_state=42,
    stratify=y
)


# Model
model = RandomForestClassifier()


# Train
model.fit(X_train, y_train)


# Predict
predictions = model.predict(X_test)


# Accuracy
accuracy = accuracy_score(y_test, predictions)

print(f"\nModel Accuracy: {accuracy:.4f}")


# Save model
joblib.dump(
    model,
    "ml/saved_models/feature_based_model.pkl"
)

print(
    "\nModel saved successfully!"
)