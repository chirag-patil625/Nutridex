import React from 'react'

export default function Footer() {
  return (
    <footer className="bg-gradient-to-br from-[#FFF5F8] via-white to-[#FFF0F5] border-t border-pink-200/30">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-600 font-medium">
            © 2024 Nutridex. All rights reserved.
          </p>
          <div className="flex gap-8 mt-4 md:mt-0">
            {['Privacy Policy', 'Terms of Service', 'Contact'].map((item) => (
              <a 
                key={item} 
                href="#" 
                className="text-[#FF4081] hover:text-[#F50057] 
                transition-colors duration-300 font-semibold 
                hover:underline"
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}