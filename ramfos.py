import pandas as pd
from sklearn.model_selection import train_test_split, cross_val_score
from sklearn.preprocessing import StandardScaler
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import classification_report, accuracy_score
import joblib

# Load the dataset
df = pd.read_csv("dataset/nutritional_balanced_dataset_100k.csv")

# Preprocess the dataset
# Convert categorical columns to numerical values
df['Health Classification'] = df['Health Classification'].map({'Healthy': 1, 'Unhealthy': 0})

# Define features and target
features = df.drop(columns=['Product Name', 'Category', 'Health Classification', 'Serving Size'])
target = df['Health Classification']

# Split the dataset into training and testing sets
X_train, X_test, y_train, y_test = train_test_split(features, target, test_size=0.2, random_state=42)

# Standardize the features
scaler = StandardScaler()
X_train_scaled = scaler.fit_transform(X_train)
X_test_scaled = scaler.transform(X_test)

# Train a RandomForestClassifier
model = RandomForestClassifier(n_estimators=100, random_state=42)
model.fit(X_train_scaled, y_train)

# Evaluate the model using cross-validation
cv_scores = cross_val_score(model, X_train_scaled, y_train, cv=5)
print("Cross-validation scores:", cv_scores)
print("Mean cross-validation score:", cv_scores.mean())

# Evaluate the model on the test set
y_pred = model.predict(X_test_scaled)
print("Accuracy:", accuracy_score(y_test, y_pred))
print("Classification Report:\n", classification_report(y_test, y_pred))

# # Save the model and scaler
# model_path = "models/health_classifier.pkl"
# scaler_path = "models/scaler.pkl"
# joblib.dump(model, model_path)
# joblib.dump(scaler, scaler_path)
# print(f"Model saved to {model_path}")
# print(f"Scaler saved to {scaler_path}")