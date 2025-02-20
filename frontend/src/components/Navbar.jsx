import React from 'react'
import { NavLink } from 'react-router-dom'
import { useTheme } from '../context/ThemeContext'

export default function Navbar() {
  const { isDark, setIsDark } = useTheme();

  return (
    <nav className="bg-secondary-light dark:bg-secondary-dark fixed w-full top-0 z-50 shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <NavLink to="/" className="text-2xl font-black text-primary-dark dark:text-primary-light">
            FODIEE
          </NavLink>
          
          <div className="flex items-center gap-4 md:gap-8">
            <NavLink 
              to="/" 
              className={({isActive}) => 
                `text-gray-600 dark:text-gray-300 hover:text-primary-dark dark:hover:text-primary-light ${
                  isActive ? 'text-primary-dark dark:text-primary-light font-medium' : ''
                }`
              }
            >
              Home
            </NavLink>
            <NavLink 
              to="/chat" 
              className={({isActive}) => 
                `text-gray-600 dark:text-gray-300 hover:text-primary-dark dark:hover:text-primary-light ${
                  isActive ? 'text-primary-dark dark:text-primary-light font-medium' : ''
                }`
              }
            >
              Scan Food
            </NavLink>

            <div className="flex items-center gap-3">
              <NavLink 
                to="/login"
                className="px-4 py-2 text-gray-700 dark:text-gray-200 hover:text-primary-dark dark:hover:text-primary-light transition-colors"
              >
                Login
              </NavLink>
              <NavLink 
                to="/signup"
                className="px-4 py-2 bg-primary-dark dark:bg-primary-light text-white dark:text-gray-800 rounded-lg 
                hover:bg-primary hover:dark:bg-primary transition-all duration-200 hover:-translate-y-0.5"
              >
                Sign Up
              </NavLink>
              <button
                onClick={() => setIsDark(!isDark)}
                className="p-2 rounded-lg bg-white/50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700
                  transition-colors duration-200"
              >
                {isDark ? (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary-light" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary-dark" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}