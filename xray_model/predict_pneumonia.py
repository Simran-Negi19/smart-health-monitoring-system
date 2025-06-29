import sys
import numpy as np
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing import image
import os
os.environ['TF_CPP_MIN_LOG_LEVEL'] = '3'  # Suppress TensorFlow info/warnings
# Load model
model_path = os.path.join(os.path.dirname(__file__), 'best_model.h5')
model = load_model(model_path)

# Get image path from command-line argument
img_path = sys.argv[1]

# Load and preprocess image
img = image.load_img(img_path, target_size=(150, 150))  # adjust size if different
img_array = image.img_to_array(img)
img_array = np.expand_dims(img_array, axis=0) / 255.0

# Predict
prediction = model.predict(img_array, verbose=0)[0][0]  # assuming binary classification output

# Decide label
label = 'Pneumonia' if prediction > 0.5 else 'Normal'

# Print result for Node.js to read
print(label)
