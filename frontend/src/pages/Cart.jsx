import React from 'react';
import { useContext, useState, useEffect } from 'react';
import { shopDataContext } from '../context/ShopContext';
import Title from '../components/Title';
import { useNavigate } from 'react-router';
import CartOrder from '../components/CartOrder';

function Cart() {
    let { cartItems, products, currency, updateQuantity } = useContext(shopDataContext);
    let [cartData, setCartData] = useState([]);
    let navigate = useNavigate();

    useEffect(() => {
        const tempData = [];
        for (let item in cartItems) {
            for (let size in cartItems[item]) {
                if (cartItems[item][size] > 0) {
                    tempData.push({ _id: item, size: size, quantity: cartItems[item][size] });
                }
            }
        }
        setCartData(tempData);
    }, [cartItems]);

    // Calculate total cart value
    const calculateTotal = () => {
        return cartData.reduce((total, item) => {
            const productData = products.find(product => product._id === item._id);
            return total + (productData ? productData.price * item.quantity : 0);
        }, 0);
    };

    return (
        <div className="container mx-auto px-4 py-8 max-w-6xl">
            <Title text1={'Your'} text2={'Cart'} />
            
            {cartData.length === 0 ? (
                <div className="text-center mt-20">
                    <h1 className="text-2xl font-bold text-gray-800">Your cart is empty</h1>
                    <button 
                        className="mt-6 px-6 py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition-colors"
                        onClick={() => navigate('/collection')}
                    >
                        Shop Now
                    </button>
                </div>
            ) : (
                <div className="mt-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="md:col-span-2">
                            <div className="bg-white rounded-lg shadow-md overflow-hidden">
                                <div className="hidden md:grid grid-cols-12 gap-4 px-6 py-3 bg-gray-100 text-gray-600 font-medium">
                                    <div className="col-span-5">Product</div>
                                    <div className="col-span-2">Price</div>
                                    <div className="col-span-2">Quantity</div>
                                    <div className="col-span-2">Total</div>
                                    <div className="col-span-1">Action</div>
                                </div>
                                
                                {cartData.map((item, index) => {
                                    const productData = products.find(product => product._id === item._id);
                                    if (!productData) return null;
                                    
                                    return (
                                        <div key={index} className="grid grid-cols-12 gap-4 p-4 border-b items-center">
                                            <div className="col-span-12 md:col-span-5 flex items-center">
                                                <div className="flex-shrink-0 h-20 w-20">
                                                    <img 
                                                        src={productData.image1} 
                                                        alt={productData.name} 
                                                        className="h-full w-full object-cover rounded"
                                                    />
                                                </div>
                                                <div className="ml-4">
                                                    <h3 className="text-lg font-medium text-gray-800">{productData.name}</h3>
                                                    <p className="text-sm text-gray-500">Size: {item.size}</p>
                                                </div>
                                            </div>
                                            
                                            <div className="col-span-4 md:col-span-2">
                                                <p className="text-gray-700">{currency} {productData.price.toFixed(2)}</p>
                                            </div>
                                            
                                            <div className="col-span-4 md:col-span-2">
                                                <input 
                                                    type="number" 
                                                    min="0"
                                                    value={item.quantity} 
                                                    className="w-20 py-1 px-2 border border-gray-300 rounded text-center"
                                                    onChange={(e) => {
                                                        const value = parseInt(e.target.value);
                                                        if (!isNaN(value) && value >= 0) {
                                                            updateQuantity(item._id, item.size, value);
                                                        }
                                                    }}
                                                />
                                            </div>
                                            
                                            <div className="col-span-3 md:col-span-2">
                                                <p className="font-medium text-gray-800">
                                                    {currency} {(productData.price * item.quantity).toFixed(2)}
                                                </p>
                                            </div>
                                            
                                            <div className="col-span-1 flex justify-end">
                                                <button 
                                                    onClick={() => updateQuantity(item._id, item.size, 0)}
                                                    className="text-red-500 hover:text-red-700"
                                                    aria-label="Remove item"
                                                >
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                    </svg>
                                                </button>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                        
                        <div className="md:col-span-1">
                            <div className="bg-white rounded-lg shadow-md p-6 sticky top-4">
                                <h3 className="text-xl font-bold text-gray-800 mb-4">Order Summary</h3>
                                
                                <div className="flex justify-between mb-2">
                                    <span className="text-gray-600">Subtotal</span>
                                    <span className="font-medium">{currency} {calculateTotal().toFixed(2)}</span>
                                </div>
                                
                                <div className="flex justify-between mb-4">
                                    <span className="text-gray-600">Shipping</span>
                                    <span className="font-medium">Free</span>
                                </div>
                                
                                <div className="border-t border-gray-200 pt-4 mb-6">
                                    <div className="flex justify-between">
                                        <span className="text-lg font-bold">Total</span>
                                        <span className="text-lg font-bold">{currency} {calculateTotal().toFixed(2)}</span>
                                    </div>
                                </div>
                                
                                <button 
                                    className="w-full bg-blue-600 text-white py-3 rounded-md font-medium hover:bg-blue-700 transition-colors"
                                    onClick={() => navigate('/placeorder')}
                                >
                                    Proceed to Checkout
                                </button>
                                
                                <div className="mt-6">
                                    <CartOrder />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Cart;