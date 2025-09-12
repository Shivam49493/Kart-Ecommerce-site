import React, { useState, useEffect } from 'react';
import back1 from '../assets/back1.jpg';
import back2 from '../assets/back2.jpg';
import back3 from '../assets/back3.jpg';
import back4 from '../assets/back4.jpg';
import { FaCircle, FaChevronLeft, FaChevronRight } from "react-icons/fa";

export const Background = ({ heroCount }) => {
  const images = [back1, back2, back3, back4];
  
  return (
    <img 
      src={images[heroCount]} 
      alt={`Background ${heroCount + 1}`} 
      className='w-full h-full object-cover absolute top-0 left-0 transition-opacity duration-500'
    />
  );
};

export const Hero = ({ heroData, heroCount, setHeroCount }) => {
  const [isTransitioning, setIsTransitioning] = useState(false);
  
  // Auto-advance carousel
  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, 5000);
    
    return () => clearInterval(interval);
  }, [heroCount]);
  
  const handleNext = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setHeroCount((prev) => (prev === 3 ? 0 : prev + 1));
      setIsTransitioning(false);
    }, 300);
  };
  
  const handlePrev = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setHeroCount((prev) => (prev === 0 ? 3 : prev - 1));
      setIsTransitioning(false);
    }, 300);
  };
  
  const goToSlide = (index) => {
    setIsTransitioning(true);
    setTimeout(() => {
      setHeroCount(index);
      setIsTransitioning(false);
    }, 300);
  };

  return (
    <div className="relative w-full h-screen overflow-hidden">
      <Background heroCount={heroCount} />
      
      {/* Overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent"></div>
      
      {/* Content */}
      <div className="relative z-10 flex flex-col justify-center items-start h-full text-white px-6 md:px-12 lg:px-24">
        <div className={`max-w-2xl transform transition-all duration-700 ${isTransitioning ? 'opacity-0 translate-x-10' : 'opacity-100 translate-x-0'}`}>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight">
            {heroData.text1}
          </h1>
          <p className="text-xl md:text-2xl lg:text-3xl mb-8 text-gray-200">
            {heroData.text2}
          </p>
          <div className="flex space-x-4">
            <button className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-8 rounded-lg transition-colors duration-300 transform hover:scale-105">
              Shop Now
            </button>
            <button className="bg-transparent border-2 border-white hover:bg-white/10 text-white font-semibold py-3 px-8 rounded-lg transition-all duration-300">
              Learn More
            </button>
          </div>
        </div>
      </div>
      
      {/* Navigation arrows */}
      <button 
        onClick={handlePrev}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 bg-black/30 hover:bg-black/50 text-white p-3 rounded-full transition-all duration-300"
        aria-label="Previous slide"
      >
        <FaChevronLeft className="w-5 h-5" />
      </button>
      
      <button 
        onClick={handleNext}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 bg-black/30 hover:bg-black/50 text-white p-3 rounded-full transition-all duration-300"
        aria-label="Next slide"
      >
        <FaChevronRight className="w-5 h-5" />
      </button>
      
      {/* Indicator dots */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-10 flex space-x-3">
        {[0, 1, 2, 3].map((index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`p-1 transition-all duration-300 ${heroCount === index ? 'transform scale-125' : ''}`}
            aria-label={`Go to slide ${index + 1}`}
          >
            <FaCircle className={`w-4 h-4 ${heroCount === index ? 'text-orange-500' : 'text-white/70 hover:text-white'}`} />
          </button>
        ))}
      </div>
      
      {/* Progress bar */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-white/20">
        <div 
          className="h-full bg-orange-500 transition-all duration-5000 ease-linear"
          style={{ 
            width: heroCount === 3 ? '100%' : `${(heroCount + 1) * 25}%`,
            transition: isTransitioning ? 'none' : 'width 5s linear'
          }}
        ></div>
      </div>
    </div>
  );
};

export default Hero;