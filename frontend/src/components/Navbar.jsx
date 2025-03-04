import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { Menu, X } from 'lucide-react'

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="fixed w-full top-0 z-50 bg-white/80 backdrop-blur-md shadow-sm">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <NavLink 
            to="/" 
            className="text-3xl font-extrabold 
            bg-gradient-to-r from-[#FF4081] to-[#F50057] 
            text-transparent bg-clip-text"
          >
            Nutridex
          </NavLink>
          
          {/* Hamburger Menu for Mobile */}
          <div className="md:hidden">
            <button 
              onClick={toggleMenu} 
              className="text-[#FF4081] focus:outline-none"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            <NavLink 
              to="/login"
              className="px-5 py-2.5 
              bg-white border border-pink-200
              text-[#FF4081] font-semibold 
              rounded-full transition-all duration-300 
              hover:bg-pink-50 hover:scale-105 
              shadow-sm"
            >
              Login
            </NavLink>
            <NavLink 
              to="/signup"
              className="px-5 py-2.5 
              bg-gradient-to-r from-[#FF4081] to-[#F50057]
              text-white font-semibold 
              rounded-full transition-all duration-300 
              hover:scale-105 hover:shadow-xl 
              shadow-[#FF4081]/30"
            >
              Sign Up
            </NavLink>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {isMenuOpen && (
          <div className="md:hidden absolute left-0 right-0 top-full bg-white shadow-lg">
            <div className="flex flex-col items-center py-4 space-y-4">
              <NavLink 
                to="/login"
                onClick={toggleMenu}
                className="w-full text-center py-3 
                text-[#FF4081] font-semibold 
                hover:bg-pink-50 transition-colors"
              >
                Login
              </NavLink>
              <NavLink 
                to="/signup"
                onClick={toggleMenu}
                className="w-full text-center py-3 
                bg-gradient-to-r from-[#FF4081] to-[#F50057]
                text-white font-semibold 
                hover:opacity-90 transition-opacity"
              >
                Sign Up
              </NavLink>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}