import React, { useContext, useEffect, useState } from 'react';
import { shopDataContext } from '../context/ShopContext';
import Title from './Title';
import Card from './Card';
import { FiArrowRight } from 'react-icons/fi';
import { useNavigate } from 'react-router';

function Bestseller() {
  const { products } = useContext(shopDataContext);
  const [bestsellers, setBestsellers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Filter products that are bestsellers and get top 4
    let filtered = products.filter((item) => !item.bestSeller);
    setBestsellers(filtered.slice(0, 4));
  }, [products]);

  if (bestsellers.length === 0) {
    return null; // Don't render anything if no bestsellers
  }

  return (
    <section className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex justify-between items-end mb-10">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">Bestsellers</h2>
            <p className="mt-2 text-lg text-gray-600">Our most popular products loved by customers</p>
          </div>
          <button 
            onClick={() => navigate('/collection')}
            className="hidden md:flex items-center text-indigo-600 hover:text-indigo-800 font-medium transition-colors"
          >
            View all
            <FiArrowRight className="ml-2 h-5 w-5" />
          </button>
        </div>

        {/* Bestseller Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {bestsellers.map((item, index) => (
            <div key={index} className="group">
              <Card 
                name={item.name} 
                image={item.image1} 
                id={item._id} 
                price={item.price} 
              />
              {/* Best seller badge */}
              <div className="mt-2 flex justify-center">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                  Bestseller
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile view all button */}
        <div className="mt-8 text-center md:hidden">
          <button 
            onClick={() => navigate('/collection')}
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            View All Products
          </button>
        </div>
      </div>
    </section>
  );
}

export default Bestseller;