import React, { useEffect } from 'react';
import Background from '../components/Background';
import { Hero } from '../components/Hero';
import LatestCollection from '../components/LatestCollection';
import Bestseller from '../components/Bestseller';
import { FiTruck, FiGift, FiShield, FiRefreshCw } from 'react-icons/fi';
import OurPolicy from '../components/OurPolicy';

function Home() {
  let heroData = [
    {text1:"30% off on all products!", text2:"Limited time offer!"},
    {text1:"Free shipping on orders over $50", text2:"Shop now and save!"},
    {text1:"New arrivals every week", text2:"Don't miss out!"},
    {text1:"Exclusive deals for members", text2:"Join today!"}
  ];
  
  let [heroCount, setHeroCount] = React.useState(0);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setHeroCount((prevCount) => (prevCount + 1) % heroData.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [heroData.length]);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <Hero heroCount={heroCount} setHeroCount={setHeroCount} heroData={heroData[heroCount]}/>
      
      {/* Features Section */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="inline-flex items-center justify-center h-12 w-12 rounded-full bg-indigo-100 text-indigo-600 mb-4">
                <FiTruck className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Free Shipping</h3>
              <p className="text-gray-600">On orders over $50</p>
            </div>
            
            <div className="text-center">
              <div className="inline-flex items-center justify-center h-12 w-12 rounded-full bg-indigo-100 text-indigo-600 mb-4">
                <FiGift className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Special Offers</h3>
              <p className="text-gray-600">Weekly new deals</p>
            </div>
            
            <div className="text-center">
              <div className="inline-flex items-center justify-center h-12 w-12 rounded-full bg-indigo-100 text-indigo-600 mb-4">
                <FiShield className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Secure Payment</h3>
              <p className="text-gray-600">Safe & encrypted</p>
            </div>
            
            <div className="text-center">
              <div className="inline-flex items-center justify-center h-12 w-12 rounded-full bg-indigo-100 text-indigo-600 mb-4">
                <FiRefreshCw className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Easy Returns</h3>
              <p className="text-gray-600">30-day return policy</p>
            </div>
          </div>
        </div>
      </section>

      {/* Latest Collection */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Latest Collection
            </h2>
            <p className="mt-4 text-xl text-gray-600">
              Discover our newest arrivals and stay ahead of the trends
            </p>
          </div>
          <LatestCollection />
        </div>
      </section>

      {/* Bestseller Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Bestsellers
            </h2>
            <p className="mt-4 text-xl text-gray-600">
              Shop our most popular products loved by customers
            </p>
          </div>
          <Bestseller />
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 bg-indigo-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
              Stay Updated
            </h2>
            <p className="mt-4 text-xl text-indigo-200">
              Subscribe to our newsletter for exclusive offers and updates
            </p>
            <div className="mt-8 max-w-2xl mx-auto">
              <form className="sm:flex">
                <label htmlFor="email-address" className="sr-only">Email address</label>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="w-full px-5 py-3 border border-transparent placeholder-gray-500 focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600 focus:outline-none rounded-md"
                  placeholder="Enter your email"
                />
                <div className="mt-3 rounded-md shadow sm:mt-0 sm:ml-3 sm:flex-shrink-0">
                  <button
                    type="submit"
                    className="w-full flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-indigo-700 bg-white hover:bg-indigo-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600"
                  >
                    Subscribe
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
      <OurPolicy/>
    </div>
  );
}

export default Home;