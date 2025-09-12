import React, { useContext, useState } from 'react';
import { FaSearch, FaShoppingCart, FaTimes } from "react-icons/fa";
import { IoPersonCircle } from "react-icons/io5";
import { userDataContext } from '../context/UserContext';
import { shopDataContext } from '../context/ShopContext';
import { useNavigate } from 'react-router';

const Nav = () => {
  const { userData, handleLogout } = useContext(userDataContext);
  const { search, setSearch, showSearch, setShowSearch, getCartCount } = useContext(shopDataContext);
  const [showProfile, setShowProfile] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <h1 
              className="text-2xl font-bold text-indigo-600 cursor-pointer" 
              onClick={() => navigate('/')}
            >
              KART
            </h1>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center space-x-4">
            <button 
              className="text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
              onClick={() => navigate('/')}
            >
              Home
            </button>
            <button 
              className="text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
              onClick={() => navigate('/about')}
            >
              About
            </button>
            <button 
              className="text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
              onClick={() => navigate('/contact')}
            >
              Contact
            </button>
            <button 
              className="text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
              onClick={() => navigate('/collection')}
            >
              Collection
            </button>
          </div>

          {/* Right side icons */}
          <div className="flex items-center space-x-4">
            {/* Search */}
            {!showSearch ? (
              <button 
                onClick={() => { setShowSearch(prev => !prev); navigate('/collection'); }}
                className="p-2 rounded-full text-gray-600 hover:text-indigo-600 hover:bg-gray-100 transition-colors"
                aria-label="Search"
              >
                <FaSearch className="h-5 w-5" />
              </button>
            ) : (
              <div className="relative hidden md:block">
                <input 
                  type="text" 
                  placeholder="Search for products, brands and more" 
                  onChange={(e) => setSearch(e.target.value)} 
                  value={search}
                  className="pl-4 pr-10 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 w-64"
                  autoFocus
                />
                <button 
                  onClick={() => setShowSearch(false)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  <FaTimes className="h-4 w-4" />
                </button>
              </div>
            )}

            {/* User Profile */}
            <div className="relative">
              {!userData ? (
                <button 
                  onClick={() => navigate('/login')}
                  className="p-2 rounded-full text-gray-600 hover:text-indigo-600 hover:bg-gray-100 transition-colors"
                  aria-label="User account"
                >
                  <IoPersonCircle className="h-6 w-6" />
                </button>
              ) : (
                <button 
                  onClick={() => setShowProfile(prev => !prev)}
                  className="flex items-center justify-center h-8 w-8 rounded-full bg-indigo-100 text-indigo-700 font-medium hover:bg-indigo-200 transition-colors"
                  aria-label="User menu"
                >
                  {userData?.name.slice(0, 1).toUpperCase()}
                </button>
              )}

              {/* Profile Dropdown */}
              {showProfile && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                  <div className="px-4 py-2 border-b border-gray-100">
                    <p className="text-sm font-medium text-gray-900">{userData.name}</p>
                    <p className="text-sm text-gray-500 truncate">{userData.email}</p>
                  </div>
                  <button 
                    onClick={() => { navigate('/orders'); setShowProfile(false); }}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                  >
                    Orders
                  </button>
                  <button 
                    onClick={() => { navigate('/wishlist'); setShowProfile(false); }}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                  >
                    Wishlist
                  </button>
                  <button 
                    onClick={() => { handleLogout(); setShowProfile(false); }}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>

            {/* Shopping Cart */}
            <div className="relative">
              <button 
                onClick={() => navigate('/cart')}
                className="p-2 rounded-full text-gray-600 hover:text-indigo-600 hover:bg-gray-100 transition-colors relative"
                aria-label="Shopping cart"
              >
                <FaShoppingCart className="h-5 w-5" />
                {getCartCount() > 0 && (
                  <span className="absolute -top-1 -right-1 bg-indigo-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                    {getCartCount()}
                  </span>
                )}
              </button>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-md text-gray-600 hover:text-indigo-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
                aria-expanded="false"
              >
                <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile search (when active) */}
        {showSearch && (
          <div className="md:hidden pb-3 px-2">
            <div className="relative">
              <input 
                type="text" 
                placeholder="Search for products, brands and more" 
                onChange={(e) => setSearch(e.target.value)} 
                value={search}
                className="pl-4 pr-10 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 w-full"
                autoFocus
              />
              <button 
                onClick={() => setShowSearch(false)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                <FaTimes className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-200 py-2">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <button 
                className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-indigo-600 hover:bg-gray-50"
                onClick={() => { navigate('/'); setMobileMenuOpen(false); }}
              >
                Home
              </button>
              <button 
                className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-indigo-600 hover:bg-gray-50"
                onClick={() => { navigate('/about'); setMobileMenuOpen(false); }}
              >
                About
              </button>
              <button 
                className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-indigo-600 hover:bg-gray-50"
                onClick={() => { navigate('/contact'); setMobileMenuOpen(false); }}
              >
                Contact
              </button>
              <button 
                className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-indigo-600 hover:bg-gray-50"
                onClick={() => { navigate('/collection'); setMobileMenuOpen(false); }}
              >
                Collection
              </button>
              {!userData ? (
                <button 
                  className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-indigo-600 hover:bg-gray-50"
                  onClick={() => { navigate('/login'); setMobileMenuOpen(false); }}
                >
                  Login
                </button>
              ) : (
                <>
                  <button 
                    className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-indigo-600 hover:bg-gray-50"
                    onClick={() => { navigate('/orders'); setMobileMenuOpen(false); }}
                  >
                    Orders
                  </button>
                  <button 
                    className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-indigo-600 hover:bg-gray-50"
                    onClick={() => { navigate('/wishlist'); setMobileMenuOpen(false); }}
                  >
                    Wishlist
                  </button>
                  <button 
                    className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-indigo-600 hover:bg-gray-50"
                    onClick={() => { handleLogout(); setMobileMenuOpen(false); }}
                  >
                    Logout
                  </button>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Nav;