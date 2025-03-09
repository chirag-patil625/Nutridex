import paddle
from paddleocr import PaddleOCR
import cv2
import os
import pandas as pd
import numpy as np
from tqdm import tqdm
import re
import spacy

# Load spaCy model
nlp = spacy.load("en_core_web_sm")

# Update patterns to include daily value percentages
NUTRITION_PATTERNS = {
    'calories': r'(\d+\.?\d*)\s*(kcal|calories)',
    'protein': r'protein\s*(\d+\.?\d*)\s*(g|grams)(?:.*?(\d+)%)?',
    'fats': r'fat\s*(\d+\.?\d*)\s*(g|grams)(?:.*?(\d+)%)?',
    'carbohydrates': r'carbohydrate\s*(\d+\.?\d*)\s*(g|grams)(?:.*?(\d+)%)?',
    'sugar': r'sugar\s*(\d+\.?\d*)\s*(g|grams)(?:.*?(\d+)%)?',
    'sodium': r'sodium\s*(\d+\.?\d*)\s*(mg|milligrams)(?:.*?(\d+)%)?',
    'fiber': r'fiber\s*(\d+\.?\d*)\s*(g|grams)(?:.*?(\d+)%)?'
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
        """Extract nutritional information using regex patterns and spaCy."""
        nutrition_data = {}
        
        # Convert text to lowercase for case-insensitive matching
        text = text.lower()
        
        # Process text with spaCy
        doc = nlp(text)
        
        # Extract nutritional values, units, and daily values using patterns
        for nutrient, pattern in NUTRITION_PATTERNS.items():
            match = re.search(pattern, text)
            if match:
                value = float(match.group(1))
                unit = match.group(2)
                daily_value = match.group(3) if len(match.groups()) > 2 and match.group(3) else None
                
                # Standardize units
                if unit in ['grams', 'g']:
                    unit = 'g'
                elif unit in ['milligrams', 'mg']:
                    unit = 'mg'
                elif unit in ['calories', 'kcal']:
                    unit = 'kcal'
                
                nutrition_data[nutrient] = {
                    'value': value,
                    'unit': unit,
                    'daily_value_percentage': float(daily_value) if daily_value else None
                }
        
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
    
    # Set absolute paths
    base_dir = os.path.dirname(os.path.abspath(__file__))
    image_dir = os.path.join(base_dir, "dataset", "food")
    output_dir = os.path.join(base_dir, "output")
    output_csv = os.path.join(output_dir, "nutrition_info.csv")
    
    # Create output directory with proper error handling
    try:
        os.makedirs(output_dir, exist_ok=True)
    except PermissionError:
        print(f"❌ Error: No permission to create directory {output_dir}")
        return
    except Exception as e:
        print(f"❌ Error creating directory: {str(e)}")
        return

    # Verify image directory exists
    if not os.path.exists(image_dir):
        print(f"❌ Error: Image directory {image_dir} does not exist")
        return
    
    # Process images
    results = []
    try:
        image_files = sorted([f for f in os.listdir(image_dir) 
                            if f.lower().endswith(('.png', '.jpg', '.jpeg'))])[:200]
    except Exception as e:
        print(f"❌ Error reading image directory: {str(e)}")
        return
    
    for image_file in tqdm(image_files, desc="Processing Food Labels"):
        image_path = os.path.join(image_dir, image_file)
        nutrition_info, text = ocr.process_image(image_path)
        
        result = {
            'image_name': image_file,
            'raw_text': text,
            'nutrition_info': nutrition_info if nutrition_info else {}
        }
        results.append(result)
        
        print(f"✅ Processed {image_file}")
        if nutrition_info:
            print(f"📊 Found nutrition info: {nutrition_info}")
    
    # Save results with error handling
    try:
        df = pd.DataFrame(results)
        df.to_csv(output_csv, index=False)
        print(f"🎉 Results saved to {output_csv}")
    except PermissionError:
        print(f"❌ Error: No permission to write to {output_csv}")
    except Exception as e:
        print(f"❌ Error saving results: {str(e)}")

if __name__ == "__main__":
    main()