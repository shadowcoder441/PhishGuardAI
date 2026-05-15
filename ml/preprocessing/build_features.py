import pandas as pd

from feature_engineering.url_features import (
    extract_url_features
)

# Loading dataset
data = pd.read_csv(
    "datasets/phishing_urls.csv"
)

feature_rows = []

# Extracting features from every URL
for url in data["url"]:
    features = extract_url_features(url)
    feature_rows.append(features)

# Converting into DataFrame
features_df = pd.DataFrame(feature_rows)

# Adding labels
features_df["label"] = data["label"]

# Saving processed dataset
features_df.to_csv(
    "datasets/processed_url_features.csv",
    index=False
)

print("\nProcessed dataset created successfully.\n")

print(features_df.head())