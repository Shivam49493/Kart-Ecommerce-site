import React from 'react';
import { shopDataContext } from '../context/ShopContext';
import { useContext } from 'react';
import { useNavigate } from 'react-router';

function Card({ name, image, id, price }) {
  let { currency } = useContext(shopDataContext);
  let navigate = useNavigate();

  return (
    <div 
      className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 ease-in-out transform hover:-translate-y-1 cursor-pointer"
      onClick={() => navigate(`/productdetail/${id}`)}
    >
      <div className="relative overflow-hidden">
        <img
          src={image}
          alt={name}
          className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute top-3 right-3 bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded-full">
          New
        </div>
      </div>
      
      <div className="p-5">
        <h3 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-1 group-hover:text-indigo-600 transition-colors">
          {name}
        </h3>
        
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          A premium product with excellent quality and design that stands out from the rest.
        </p>
        
        <div className="flex items-center justify-between mt-4">
          <span className="text-2xl font-bold text-indigo-700">
            {currency} {price}
          </span>
          
          <button 
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/productdetail/${id}`);
            }}
          >
            View Details
          </button>
        </div>
      </div>
    </div>
  );
}

export default Card;