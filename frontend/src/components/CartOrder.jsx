import React from 'react';
import { shopDataContext } from '../context/ShopContext';

function CartOrder() {
  let { cartItems, currency, deliveryCharge, getCartAmount, getCartCount } = React.useContext(shopDataContext);
  
  let cartData = structuredClone(cartItems);
  let totalPrice = getCartAmount();
  let totalItems = getCartCount();
  
  return (
    <div className="max-w-md mx-auto p-4">
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-4 text-white">
          <h2 className="text-xl font-bold">Order Summary</h2>
        </div>
        
        <div className="p-4">
          {totalItems > 0 ? (
            <div className="border border-gray-200 rounded-lg p-4 mb-4 bg-gray-50">
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-600">Items:</span>
                <span className="font-medium">{totalItems}</span>
              </div>
              
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-600">Subtotal:</span>
                <span className="font-medium">{totalPrice} {currency}</span>
              </div>
              
              <div className="flex justify-between items-center mb-3">
                <span className="text-gray-600">Delivery:</span>
                <span className="font-medium">{deliveryCharge} {currency}</span>
              </div>
              
              <hr className="my-3 border-gray-300" />
              
              <div className="flex justify-between items-center">
                <span className="text-lg font-bold text-gray-800">Total:</span>
                <span className="text-lg font-bold text-blue-700">
                  {totalPrice + deliveryCharge} {currency}
                </span>
              </div>
            </div>
          ) : (
            <div className="text-center py-6 bg-gray-50 rounded-lg border border-dashed border-gray-300">
              <svg 
                className="mx-auto h-12 w-12 text-gray-400" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" 
                />
              </svg>
              <p className="mt-2 text-gray-600">Your cart is empty</p>
            </div>
          )}
          
          
        </div>
      </div>
    </div>
  );
}

export default CartOrder;