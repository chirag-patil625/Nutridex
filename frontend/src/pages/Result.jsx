import React from 'react'
import { FiAlertCircle, FiCheckCircle } from 'react-icons/fi'

export default function Result() {
  const mockResult = {
    healthScore: 75,
    ingredients: [
      { name: 'Water', safe: true, description: 'Basic ingredient, no concerns' },
      { name: 'High Fructose Corn Syrup', safe: false, description: 'Added sugar that may contribute to health issues' },
      { name: 'Natural Flavors', safe: true, description: 'Generally recognized as safe' },
      { name: 'Citric Acid', safe: true, description: 'Common preservative, generally safe' },
      { name: 'Red 40', safe: false, description: 'Artificial color with potential health concerns' }
    ],
    nutrition: {
      calories: '240 kcal',
      totalFat: '12g',
      saturatedFat: '5g',
      cholesterol: '30mg',
      sodium: '430mg',
      carbohydrates: '28g',
      fiber: '4g',
      sugars: '12g',
      protein: '8g'
    },
    summary: 'This product contains some concerning ingredients but is generally moderate in nutritional value. Consider alternatives with fewer artificial additives.'
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FFF5F8] via-white to-[#FFF0F5] pt-20 pb-10 px-4">
      <div className="container mx-auto max-w-4xl">
        {/* Health Score */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6 text-center">
          <h2 className="text-2xl font-semibold 
            bg-gradient-to-r from-[#FF4081] to-[#F50057] 
            text-transparent bg-clip-text mb-4">
            Health Score
          </h2>
          <div className="relative inline-flex items-center justify-center">
            <svg className="w-32 h-32">
              <circle
                className="text-pink-100"
                strokeWidth="8"
                stroke="currentColor"
                fill="transparent"
                r="58"
                cx="64"
                cy="64"
              />
              <circle
                className="text-[#FF4081]"
                strokeWidth="8"
                strokeDasharray={`${mockResult.healthScore * 3.64} 364`}
                strokeLinecap="round"
                stroke="currentColor"
                fill="transparent"
                r="58"
                cx="64"
                cy="64"
              />
            </svg>
            <span className="absolute text-3xl font-bold text-gray-800">
              {mockResult.healthScore}%
            </span>
          </div>
        </div>

        {/* Summary */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <h2 className="text-2xl font-semibold 
            bg-gradient-to-r from-[#FF4081] to-[#F50057] 
            text-transparent bg-clip-text mb-4">
            Analysis Summary
          </h2>
          <p className="text-gray-600">{mockResult.summary}</p>
        </div>

        {/* Ingredients Analysis */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-semibold 
              bg-gradient-to-r from-[#FF4081] to-[#F50057] 
              text-transparent bg-clip-text mb-4">
              Ingredients Analysis
            </h2>
            <div className="space-y-4">
              {mockResult.ingredients.map((ingredient, index) => (
                <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-pink-50 hover:bg-pink-100 transition-colors">
                  {ingredient.safe ? (
                    <FiCheckCircle className="w-5 h-5 text-[#FF4081] mt-0.5" />
                  ) : (
                    <FiAlertCircle className="w-5 h-5 text-[#F50057] mt-0.5" />
                  )}
                  <div>
                    <h3 className="font-medium text-gray-900">{ingredient.name}</h3>
                    <p className="text-sm text-gray-600">{ingredient.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Nutrition Facts */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-semibold 
              bg-gradient-to-r from-[#FF4081] to-[#F50057] 
              text-transparent bg-clip-text mb-4">
              Nutrition Facts
            </h2>
            <div className="space-y-3">
              {Object.entries(mockResult.nutrition).map(([key, value]) => (
                <div key={key} className="flex justify-between py-2 border-b border-pink-200">
                  <span className="text-gray-600 capitalize">
                    {key.replace(/([A-Z])/g, ' $1').trim()}
                  </span>
                  <span className="font-medium text-[#FF4081]">{value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}