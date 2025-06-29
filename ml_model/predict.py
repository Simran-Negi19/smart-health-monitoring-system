import os
import sys
import joblib
import numpy as np
import json

sys.stdout.reconfigure(line_buffering=True)  # Ensure output flushes immediately

# Load model and scaler
base_dir = os.path.dirname(__file__)
model = joblib.load(os.path.join(base_dir, "heart_disease_model.pkl"))
scaler = joblib.load(os.path.join(base_dir, "scaler.pkl"))

# Read input features
input_data = json.loads(sys.argv[1])
features = np.array(input_data).reshape(1, -1)
features_scaled = scaler.transform(features)

# Predict
prediction = model.predict(features_scaled)


# Output ONLY the result (important for Node.js to parse)
print(int(prediction[0]))
