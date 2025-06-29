# === Module 1: Imports and Config ===
import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns
import os
import cv2

from tensorflow.keras.models import Model, load_model
from tensorflow.keras.layers import Dense, Dropout, GlobalAveragePooling2D
from tensorflow.keras.applications import MobileNetV2
from tensorflow.keras.callbacks import ReduceLROnPlateau, ModelCheckpoint, EarlyStopping
from tensorflow.keras.preprocessing.image import ImageDataGenerator
from sklearn.metrics import classification_report, confusion_matrix

# Config
labels = ['PNEUMONIA', 'NORMAL']
img_size = 150
train_model = True  # Toggle for retraining

# === Module 2: Load and preprocess the dataset ===
def get_data(data_dir):
    data = []
    for label in labels:
        path = os.path.join(data_dir, label)
        class_num = labels.index(label)
        for img_name in os.listdir(path):
            try:
                img_path = os.path.join(path, img_name)
                img = cv2.imread(img_path, cv2.IMREAD_GRAYSCALE)
                resized = cv2.resize(img, (img_size, img_size))
                data.append([resized, class_num])
            except Exception as e:
                print(f"Error loading image {img_path}: {e}")
    return np.array(data, dtype=object)

train = get_data('data/chest_xray/train')
val = get_data('data/chest_xray/val')
test = get_data('data/chest_xray/test')

print("Train samples:", len(train))
print("Validation samples:", len(val))
print("Test samples:", len(test))

# === Module 3: Prepare Data ===
def prepare_data(data):
    X = np.array([i[0] for i in data]).reshape(-1, img_size, img_size, 1)
    X = np.repeat(X, 3, axis=-1) / 255.0
    y = np.array([i[1] for i in data])
    return X, y

X_train, y_train = prepare_data(train)
X_val, y_val = prepare_data(val)
X_test, y_test = prepare_data(test)

# === Module 4: Build Model with Transfer Learning ===
base_model = MobileNetV2(input_shape=(img_size, img_size, 3), include_top=False, weights='imagenet')
base_model.trainable = True

# Unfreeze the last few layers
for layer in base_model.layers[:-30]:
    layer.trainable = False

x = base_model.output
x = GlobalAveragePooling2D()(x)
x = Dense(256, activation='relu')(x)
x = Dropout(0.6)(x)
output = Dense(1, activation='sigmoid')(x)

model = Model(inputs=base_model.input, outputs=output)
model.compile(optimizer='adam', loss='binary_crossentropy', metrics=['accuracy'])

# === Module 5: Data Augmentation and Training ===
train_datagen = ImageDataGenerator(
    rotation_range=20,
    zoom_range=0.15,
    width_shift_range=0.1,
    height_shift_range=0.1,
    horizontal_flip=True,
    brightness_range=[0.8, 1.2]
)

val_datagen = ImageDataGenerator()

train_generator = train_datagen.flow(X_train, y_train, batch_size=32)
val_generator = val_datagen.flow(X_val, y_val, batch_size=32)

checkpoint = ModelCheckpoint('best_model.h5', monitor='val_loss', save_best_only=True, verbose=1)
early_stop = EarlyStopping(monitor='val_loss', patience=5, restore_best_weights=True, verbose=1)
lr_reduction = ReduceLROnPlateau(monitor='val_loss', factor=0.5, patience=2, min_lr=1e-5, verbose=1)

# === Module 6: Train Model ===
if train_model:
    history = model.fit(
        train_generator,
        epochs=25,
        validation_data=val_generator,
        callbacks=[checkpoint, early_stop, lr_reduction]
    )
    model.save('pneumonia_model_final.h5')

# === Module 7: Training Curves ===
if train_model:
    plt.figure(figsize=(12, 5))
    plt.subplot(1, 2, 1)
    plt.plot(history.history['accuracy'], label='Train Accuracy', color='blue')
    plt.plot(history.history['val_accuracy'], label='Val Accuracy', color='green')
    plt.title('Model Accuracy')
    plt.xlabel('Epoch')
    plt.ylabel('Accuracy')
    plt.legend()

    plt.subplot(1, 2, 2)
    plt.plot(history.history['loss'], label='Train Loss', color='red')
    plt.plot(history.history['val_loss'], label='Val Loss', color='orange')
    plt.title('Model Loss')
    plt.xlabel('Epoch')
    plt.ylabel('Loss')
    plt.legend()

    plt.tight_layout()
    plt.savefig('training_history.png')
    plt.show()

# === Module 8: Evaluate on Test Set ===
model = load_model('best_model.h5')

y_pred_probs = model.predict(X_test)
y_pred = (y_pred_probs > 0.5).astype("int32").flatten()

print("\nClassification Report:\n")
print(classification_report(y_test, y_pred, target_names=labels))

cm = confusion_matrix(y_test, y_pred)
plt.figure(figsize=(6, 4))
sns.heatmap(cm, annot=True, fmt="d", cmap="Blues", xticklabels=labels, yticklabels=labels, cbar=False)
plt.xlabel("Predicted Label")
plt.ylabel("True Label")
plt.title("Confusion Matrix")
plt.savefig('confusion_matrix.png')
plt.show()

# === Module 9: Predict Single Image ===
def predict_single_image(image_path):
    img = cv2.imread(image_path, cv2.IMREAD_GRAYSCALE)
    img_resized = cv2.resize(img, (img_size, img_size))
    img_resized = np.expand_dims(img_resized, axis=-1)
    img_resized = np.repeat(img_resized, 3, axis=-1)
    img_normalized = img_resized / 255.0
    img_reshaped = img_normalized.reshape(1, img_size, img_size, 3)

    prediction_prob = model.predict(img_reshaped)[0][0]
    label = "PNEUMONIA" if prediction_prob >= 0.5 else "NORMAL"

    plt.imshow(img_resized[..., 0], cmap='gray')
    plt.title(f"Prediction: {label} ({prediction_prob:.2f})")
    plt.axis('off')
    plt.show()

# Example
predict_single_image('data/chest_xray/test/PNEUMONIA/person1685_virus_2903.jpeg')
