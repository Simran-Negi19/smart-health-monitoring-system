import os
# print("Current Working Directory:", os.getcwd())

import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score
import joblib

# Load dataset
df = pd.read_csv(os.path.join(os.path.dirname(__file__), "heart.csv"))


# Split features and target
X = df.drop(columns=['target'])  # All columns except 'target'
y = df['target']  # Target variable

# Split data into train and test sets
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Standardize features
scaler = StandardScaler()
X_train = scaler.fit_transform(X_train)
X_test = scaler.transform(X_test)

# Train model
model = RandomForestClassifier(n_estimators=100, random_state=42)
model.fit(X_train, y_train)

# Evaluate model
y_pred = model.predict(X_test)
accuracy = accuracy_score(y_test, y_pred)
print(f"Model Accuracy: {accuracy:.2f}")

# Save model and scaler
joblib.dump(model, "ml_model/heart_disease_model.pkl")
joblib.dump(scaler, "ml_model/scaler.pkl")

print("Model saved successfully!")
