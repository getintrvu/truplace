import React, { useState } from 'react';
import { Menu, X, Search, Edit } from 'lucide-react';
import EmailVerificationModal from './EmailVerificationModal';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleWriteReviewClick = () => {
    setIsModalOpen(true);
  };

  return (
    <>
      <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-green-500 rounded-lg flex items-center justify-center">
                <Search className="w-4 h-4 text-white" />
              </div>
              <h1 className="text-xl font-bold text-gray-900">Truplace</h1>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="/reviews" className="text-gray-600 hover:text-gray-900 transition-colors duration-200">
              Reviews
            </a>
            <a href="/companies" className="text-gray-600 hover:text-gray-900 transition-colors duration-200">
              Companies
            </a>
            <a href="/about" className="text-gray-600 hover:text-gray-900 transition-colors duration-200">
              About
            </a>
          </nav>

          {/* CTA Button */}
          <div className="hidden md:flex items-center">
            <button 
              onClick={handleWriteReviewClick}
              className="bg-gradient-to-r from-blue-600 to-green-500 text-white px-6 py-2 rounded-lg font-medium hover:shadow-lg hover:scale-105 transition-all duration-300 flex items-center space-x-2"
            >
              <Edit className="w-4 h-4" />
              <span>Write a Review</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-200 py-4">
            <nav className="flex flex-col space-y-4">
              <a href="/reviews" className="text-gray-600 hover:text-gray-900 transition-colors duration-200">
                Reviews
              </a>
              <a href="/companies" className="text-gray-600 hover:text-gray-900 transition-colors duration-200">
                Companies
              </a>
              <a href="/about" className="text-gray-600 hover:text-gray-900 transition-colors duration-200">
                About
              </a>
              <button 
                onClick={handleWriteReviewClick}
                className="bg-gradient-to-r from-blue-600 to-green-500 text-white px-6 py-2 rounded-lg font-medium hover:shadow-lg transition-all duration-300 flex items-center justify-center space-x-2 w-full"
              >
                <Edit className="w-4 h-4" />
                <span>Write a Review</span>
              </button>
            </nav>
          </div>
        )}
      </div>
      </header>

      <EmailVerificationModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </>
  );
};

export default Header;