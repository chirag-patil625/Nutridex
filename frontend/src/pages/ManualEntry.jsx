import React, { useState } from 'react';
import { Edit, CheckCircle, X } from 'lucide-react';

const ManualEntry = () => {
  const [formData, setFormData] = useState({
    servingSize: '',
    calories: '',
    totalFat: '',
    saturatedFat: '',
    transFat: '',
    cholesterol: '',
    sodium: '',
    totalCarbohydrates: '',
    dietaryFiber: '',
    sugars: '',
    protein: '',
    ingredients: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add submission logic
    console.log('Form submitted', formData);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FFF5F8] via-white to-[#FFF0F5] pt-32 pb-16">
      <div className="container mx-auto max-w-4xl px-4">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-extrabold 
            bg-gradient-to-r from-[#FF4081] to-[#F50057] 
            text-transparent bg-clip-text 
            mb-4 tracking-tight">
            Manual Nutrition Entry
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Enter nutrition facts manually for precise analysis
          </p>
        </div>

        <form 
          onSubmit={handleSubmit}
          className="bg-white shadow-2xl rounded-3xl p-8 border border-pink-100"
        >
          <div className="grid md:grid-cols-2 gap-6">
            {/* Nutrition Facts Inputs */}
            {[
              { label: 'Serving Size', name: 'servingSize', placeholder: 'e.g., 1 cup (240ml)' },
              { label: 'Calories', name: 'calories', placeholder: 'Total calories' },
              { label: 'Total Fat', name: 'totalFat', placeholder: 'in grams' },
              { label: 'Saturated Fat', name: 'saturatedFat', placeholder: 'in grams' },
              { label: 'Trans Fat', name: 'transFat', placeholder: 'in grams' },
              { label: 'Cholesterol', name: 'cholesterol', placeholder: 'in mg' },
              { label: 'Sodium', name: 'sodium', placeholder: 'in mg' },
              { label: 'Total Carbohydrates', name: 'totalCarbohydrates', placeholder: 'in grams' },
              { label: 'Dietary Fiber', name: 'dietaryFiber', placeholder: 'in grams' },
              { label: 'Sugars', name: 'sugars', placeholder: 'in grams' },
              { label: 'Protein', name: 'protein', placeholder: 'in grams' }
            ].map((field) => (
              <div key={field.name}>
                <label 
                  htmlFor={field.name} 
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  {field.label}
                </label>
                <input
                  type="text"
                  id={field.name}
                  name={field.name}
                  value={formData[field.name]}
                  onChange={handleInputChange}
                  placeholder={field.placeholder}
                  className="w-full px-4 py-2 border border-pink-200 
                  rounded-lg focus:ring-2 focus:ring-[#FF4081] 
                  focus:border-transparent transition-all"
                />
              </div>
            ))}
          </div>

          {/* Ingredients Textarea */}
          <div className="mt-6">
            <label 
              htmlFor="ingredients" 
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Ingredients
            </label>
            <textarea
              id="ingredients"
              name="ingredients"
              value={formData.ingredients}
              onChange={handleInputChange}
              placeholder="List all ingredients..."
              rows={4}
              className="w-full px-4 py-2 border border-pink-200 
              rounded-lg focus:ring-2 focus:ring-[#FF4081] 
              focus:border-transparent transition-all"
            />
          </div>

          {/* Submit Button */}
          <div className="mt-8 text-center">
            <button
              type="submit"
              className="flex items-center gap-2 mx-auto
              bg-gradient-to-r from-[#FF4081] to-[#F50057]
              text-white font-semibold py-3 px-8 
              rounded-full transition-all 
              hover:scale-105 hover:shadow-xl"
            >
              <CheckCircle className="w-5 h-5"/>
              Analyze Nutrition
            </button>
          </div>
        </form>

        {/* Tips Section */}
        <div className="mt-12 text-center">
          <div className="inline-block bg-pink-50 rounded-2xl p-6">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">
              Manual Entry Tips
            </h3>
            <ul className="space-y-2 text-gray-600 max-w-xl mx-auto">
              <li className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-500"/>
                Use exact values from the nutrition label
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-500"/>
                Include serving size for accurate analysis
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-500"/>
                List ingredients in order of quantity
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManualEntry;