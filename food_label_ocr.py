import paddle
from paddleocr import PaddleOCR
import cv2
import os
import pandas as pd
import numpy as np
from tqdm import tqdm
import re

# Define nutritional information patterns
NUTRITION_PATTERNS = {
    'calories': r'(\d+)\s*kcal',
    'protein': r'protein\s*(\d+\.?\d*)\s*g',
    'fats': r'fat\s*(\d+\.?\d*)\s*g',
    'carbohydrates': r'carbohydrate\s*(\d+\.?\d*)\s*g',
    'sugar': r'sugar\s*(\d+\.?\d*)\s*g',
    'sodium': r'sodium\s*(\d+\.?\d*)\s*mg',
    'fiber': r'fiber\s*(\d+\.?\d*)\s*g'
}

class FoodLabelOCR:
    def __init__(self, use_gpu=True):
        """Initialize OCR with GPU support."""
        self.ocr = PaddleOCR(use_angle_cls=True, lang="en", use_gpu=use_gpu)
        
    def preprocess_image(self, image):
        """Preprocess image for better OCR results."""
        # Convert to grayscale
        gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
        # Apply adaptive thresholding
        thresh = cv2.adaptiveThreshold(gray, 255, cv2.ADAPTIVE_THRESH_GAUSSIAN_C, 
                                     cv2.THRESH_BINARY, 11, 2)
        return thresh
    
    def extract_nutrition_info(self, text):
        """Extract nutritional information using regex patterns."""
        nutrition_data = {}
        
        # Convert text to lowercase for case-insensitive matching
        text = text.lower()
        
        # Extract nutritional values using patterns
        for nutrient, pattern in NUTRITION_PATTERNS.items():
            match = re.search(pattern, text)
            if match:
                nutrition_data[nutrient] = float(match.group(1))
                
        return nutrition_data
    
    def process_image(self, image_path):
        """Process a single image and extract nutritional information."""
        # Read and preprocess image
        image = cv2.imread(image_path)
        if image is None:
            return None, "Failed to read image"
            
        processed_image = self.preprocess_image(image)
        
        try:
            # Perform OCR
            result = self.ocr.ocr(processed_image)
            
            # Extract text
            if result and isinstance(result[0], list):
                text = " ".join([line[1][0] for line in result[0] if line])
                
                # Extract nutritional information
                nutrition_info = self.extract_nutrition_info(text)
                return nutrition_info, text
            
            return None, "No text detected"
            
        except Exception as e:
            return None, f"Error processing image: {str(e)}"

def main():
    # Initialize FoodLabelOCR
    ocr = FoodLabelOCR(use_gpu=True)
    
    # Set paths
    image_dir = "dataset/food"
    output_csv = "output/nutrition_info.csv"
    
    # Create output directory
    os.makedirs(os.path.dirname(output_csv), exist_ok=True)
    
    # Process images
    results = []
    image_files = sorted(os.listdir(image_dir))[:200]
    
    for image_file in tqdm(image_files, desc="Processing Food Labels"):
        image_path = os.path.join(image_dir, image_file)
        nutrition_info, text = ocr.process_image(image_path)
        
        result = {
            'image_name': image_file,
            'raw_text': text,
            **({'nutrition_info': nutrition_info} if nutrition_info else {})
        }
        results.append(result)
        
        print(f"✅ Processed {image_file}")
        if nutrition_info:
            print(f"📊 Found nutrition info: {nutrition_info}")
    
    # Save results
    df = pd.DataFrame(results)
    df.to_csv(output_csv, index=False)
    print(f"🎉 Results saved to {output_csv}")

if __name__ == "__main__":
    main()