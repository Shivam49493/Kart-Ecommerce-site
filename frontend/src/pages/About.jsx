import React from 'react';
import Title from '../components/Title';
import OurPolicy from '../components/OurPolicy';

function About() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-12 max-w-6xl">
        <Title text1="About" text2="Us" />
        
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Our Story</h2>
            <p className="text-gray-600 mb-4">
              Founded in 2010, our company began with a simple mission: to provide high-quality products 
              that combine style, functionality, and affordability. What started as a small family business 
              has grown into a trusted brand serving customers worldwide.
            </p>
            <p className="text-gray-600 mb-4">
              We believe that everyone deserves access to well-designed products that enhance daily life. 
              Our team of designers and craftsmen work tirelessly to create items that are not only beautiful 
              but also built to last.
            </p>
            <p className="text-gray-600">
              Today, we continue to innovate while staying true to our core values of quality, sustainability, 
              and exceptional customer service.
            </p>
          </div>
          
          <div className="relative">
            <div className="w-full h-80 bg-blue-100 rounded-lg overflow-hidden">
              <div className="w-full h-full flex items-center justify-center bg-gradient-to-r from-blue-200 to-indigo-200">
                <span className="text-5xl text-blue-800 font-bold">Our Team</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Our Values</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Quality</h3>
              <p className="text-gray-600">
                We never compromise on quality. Every product is carefully crafted and thoroughly tested.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Sustainability</h3>
              <p className="text-gray-600">
                We're committed to eco-friendly practices and sustainable sourcing of materials.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Community</h3>
              <p className="text-gray-600">
                We support local communities and give back through various initiatives.
              </p>
            </div>
          </div>
        </div>
      </div>
      <OurPolicy/>
    </div>
  );
}

export default About;