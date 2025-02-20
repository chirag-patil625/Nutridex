import React from 'react'

export default function Footer() {
  return (
    <footer className="bg-secondary-light dark:bg-secondary-dark border-t border-primary/10 dark:border-primary-light/10">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-600 dark:text-gray-300">
            © 2024 FODIEE. All rights reserved.
          </p>
          <div className="flex gap-8 mt-4 md:mt-0">
            {['Privacy Policy', 'Terms of Service', 'Contact'].map((item) => (
              <a 
                key={item} 
                href="#" 
                className="text-gray-600 dark:text-gray-300 hover:text-primary-dark dark:hover:text-primary-light 
                transition-colors"
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
