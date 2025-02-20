import React from 'react'
import { NavLink } from 'react-router-dom'

export default function Home() {
  return (
    <div className="min-h-screen bg-secondary-light dark:bg-secondary-dark transition-colors duration-200">
      <div className="container mx-auto px-4 py-24">
        <div className="text-center max-w-4xl mx-auto mb-20">
          <h1 className="text-7xl font-black text-primary-dark dark:text-primary-light mb-8">
            FODIEE
          </h1>
          <p className="text-2xl text-gray-700 dark:text-gray-300 mb-12 leading-relaxed font-light max-w-2xl mx-auto">
            Your Smart Food Analysis Companion.<br/>
            Scan & Learn What's Really in Your Food
          </p>
          <NavLink
            to="/chat"
            className="inline-flex items-center gap-2 bg-primary hover:bg-primary-dark dark:bg-primary-light
            dark:hover:bg-primary text-white dark:text-secondary-dark font-medium py-4 px-8 rounded-md text-lg 
            shadow-lg transition-all duration-300 hover:-translate-y-0.5"
          >
            Start Scanning Now
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </NavLink>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {['Quick Analysis', 'Ingredient Check', 'Nutrition Facts'].map((title, index) => (
            <div key={index} 
              className="bg-white dark:bg-gray-800/50 backdrop-blur p-8 rounded-lg 
              border border-primary/10 dark:border-primary-light/10 hover:border-primary/30 
              dark:hover:border-primary-light/30 transform transition-all duration-300 
              hover:-translate-y-1 shadow-lg"
            >
              <div className="mb-4 text-blue-400">
                {index === 0 && <span className="text-3xl">🔍</span>}
                {index === 1 && <span className="text-3xl">🧪</span>}
                {index === 2 && <span className="text-3xl">📊</span>}
              </div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                {title}
              </h2>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                {index === 0 && "Instant health insights through advanced OCR technology"}
                {index === 1 && "Deep analysis of ingredients and their health impact"}
                {index === 2 && "Comprehensive nutritional information at your fingertips"}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
