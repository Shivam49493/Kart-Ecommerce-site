import React, { useContext, useEffect, useState } from 'react';
import Title from './Title';
import { shopDataContext } from '../context/ShopContext';
import Card from './Card';
import { FiArrowRight, FiClock } from 'react-icons/fi';
import { useNavigate } from 'react-router';

function LatestCollection() {
  let { products } = useContext(shopDataContext);
  let [latestProducts, setLatestProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (products && products.length > 0) {
      let sortedProducts = [...products].sort((a, b) => 
        new Date(b.addedDate || new Date()) - new Date(a.addedDate || new Date())
      );
      setLatestProducts(sortedProducts.slice(0, 4)); // Get the latest 4 products
    }
  }, [products]);

  if (latestProducts.length === 0) {
    return null; // Don't render anything if no products
  }

  return (
    <section className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-end mb-10">
          <div className="text-center md:text-left mb-6 md:mb-0">
            <div className="inline-flex items-center justify-center md:justify-start">
              
            
            </div>
            <p className="mt-2 text-lg text-gray-600">
              Discover our newest arrivals and stay ahead of the trends
            </p>
          </div>
          
          <button 
            onClick={() => navigate('/collection')}
            className="hidden md:flex items-center text-indigo-600 hover:text-indigo-800 font-medium transition-colors duration-200 self-center md:self-end"
          >
            View all new arrivals
            <FiArrowRight className="ml-2 h-5 w-5" />
          </button>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {latestProducts.map((item, index) => (
            <div key={index} className="group relative">
              {/* New arrival badge */}
              <div className="absolute top-3 left-3 z-10">
                
              </div>
              <Card 
                name={item.name} 
                image={item.image1} 
                id={item._id} 
                price={item.price} 
              />
            </div>
          ))}
        </div>

        {/* Mobile view all button */}
        <div className="mt-10 text-center md:hidden">
          <button 
            onClick={() => navigate('/collection')}
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200"
          >
            View All New Arrivals
            <FiArrowRight className="ml-2 h-5 w-5" />
          </button>
        </div>

        {/* Decorative element */}
        <div className="mt-16 border-t border-gray-200 pt-8 text-center">
          <p className="text-sm text-gray-500">
            New products added weekly • Free shipping on orders over $50 • 30-day returns
          </p>
        </div>
      </div>
    </section>
  );
}

export default LatestCollection;