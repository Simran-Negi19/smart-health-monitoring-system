# predict_diabetes.py

import sys
import pickle
import numpy as np
import os

# Determine the directory where this script is located
script_dir = os.path.dirname(os.path.abspath(__file__))
model_path = os.path.join(script_dir, 'diabetes_model.pkl')

# Load the model using the absolute path
with open(model_path, 'rb') as f:
    model = pickle.load(f)

# Get input from command-line arguments (expects 8 values)
# Example usage:
# python predict_diabetes.py 2 120 70 25 100 30.5 0.5 25
if len(sys.argv) != 9:
    print("Error: Please provide 8 numerical input values")
    sys.exit(1)

# Convert inputs to float and reshape for prediction
try:
    input_data = np.array([float(x) for x in sys.argv[1:]]).reshape(1, -1)
except ValueError:
    print("Error: All inputs must be numbers")
    sys.exit(1)

# Predict
prediction = model.predict(input_data)
result = "Diabetic" if prediction[0] == 1 else "Not Diabetic"

print(result)
