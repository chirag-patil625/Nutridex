import React from 'react'
import { Link } from 'react-router-dom'
import { useTheme } from '../context/ThemeContext'
import loginImg from '../assests/login.jpg'

export default function Login() {
  const { isDark } = useTheme();

  return (
    <div className="min-h-screen bg-secondary-light dark:bg-secondary-dark transition-colors duration-200">
      <div className="container mx-auto p-4">
        <div className="flex rounded-2xl overflow-hidden shadow-2xl bg-white dark:bg-gray-800 my-16 max-w-4xl mx-auto">
          {/* Left: Image Section */}
          <div className="hidden lg:block w-5/12 relative">
            <div className="absolute inset-0 bg-gradient-to-br from-primary-dark/90 to-accent-blue-dark/90 mix-blend-multiply"></div>
            <img 
              src={loginImg}
              alt="Food Analysis" 
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-0 left-0 right-0 p-12 text-white">
              <h2 className="text-3xl font-bold mb-4">Analyze Your Food</h2>
              <p className="text-lg opacity-90">Get instant insights about your food's nutritional value</p>
            </div>
          </div>

          {/* Right: Form Section */}
          <div className="w-full lg:w-7/12 p-6 md:p-8">
            <div className="max-w-sm mx-auto">
              <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-8">Welcome Back!</h3>

              <form className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">Email</label>
                  <input 
                    type="email" 
                    className="w-full px-4 py-3 rounded-lg border bg-gray-50 dark:bg-gray-700 dark:border-gray-600 
                    dark:text-white focus:ring-2 focus:ring-primary-dark dark:focus:ring-primary-light transition-all"
                    placeholder="Enter your email"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">Password</label>
                  <input 
                    type="password" 
                    className="w-full px-4 py-3 rounded-lg border bg-gray-50 dark:bg-gray-700 dark:border-gray-600 
                    dark:text-white focus:ring-2 focus:ring-primary-dark dark:focus:ring-primary-light transition-all"
                    placeholder="Enter your password"
                  />
                </div>

                <button 
                  className="w-full py-3 bg-gradient-to-r from-primary-dark to-accent-blue-dark dark:from-primary-light 
                  dark:to-accent-blue-light text-white dark:text-gray-800 rounded-lg hover:from-primary hover:to-accent-blue 
                  transform transition-all hover:scale-[1.02]"
                >
                  Sign in
                </button>
              </form>

              <div className="mt-8 text-center">
                <Link to="/signup" className="text-primary-dark dark:text-primary-light hover:text-primary hover:dark:text-primary font-medium">
                  Don't have an account? Sign up
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
