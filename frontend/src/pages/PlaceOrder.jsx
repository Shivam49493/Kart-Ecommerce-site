import React, { useState, useContext, useEffect } from 'react'
import CartOrder from '../components/CartOrder'
import Title from '../components/Title'
import { shopDataContext } from '../context/ShopContext'
import axios from 'axios'
import { useNavigate } from 'react-router'
import { userDataContext } from '../context/UserContext'
import { authDataContext } from '../context/AuthContext'

function PlaceOrder() {
  let { products, cartItems, setCartItems, getCartAmount, deliveryCharge } = useContext(shopDataContext)
  let { serverUrl } = useContext(authDataContext)
  let { userData } = useContext(userDataContext)
  let navigate = useNavigate();

  let [method, setMethod] = useState('cod')
  let [formData, setFormData] = useState({
    name: userData?.name || '',
    email: userData?.email || '',
    phone: userData?.phone || '',
    address: userData?.address || ''
  })

  // Load Razorpay script
  useEffect(() => {
    const loadRazorpayScript = () => {
      return new Promise((resolve) => {
        if (document.getElementById('razorpay-script')) {
          resolve(true);
          return;
        }
        
        const script = document.createElement('script');
        script.id = 'razorpay-script';
        script.src = 'https://checkout.razorpay.com/v1/checkout.js';
        script.onload = () => resolve(true);
        script.onerror = () => resolve(false);
        document.body.appendChild(script);
      });
    };

    loadRazorpayScript();
  }, []);

  const handleChange = (e) => {
    const name = e.target.name
    const value = e.target.value
    setFormData({ ...formData, [name]: value })
  }

  const initPay = (orderData) => {
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: orderData.amount,
      currency: orderData.currency,
      name: "Your Store Name",
      description: "Order Payment",
      order_id: orderData.orderId,
      receipt: orderData.receipt,
      handler: async (response) => {
        try {
          console.log("Payment response:", response);
          
          // Verify payment with your server
          const { data } = await axios.post(`${serverUrl}/api/orders/verifypayment`, {
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_order_id: response.razorpay_order_id,
            razorpay_signature: response.razorpay_signature,
            orderId: orderData.receipt
          }, { withCredentials: true });

          if(data){
            setCartItems({});
            navigate('/orders');
          }
        } catch (error) {
          console.error("Payment verification error:", error);
          alert("Payment verification failed");
        }
      },
      prefill: {
        name: formData.name,
        email: formData.email || userData?.email || '',
        contact: formData.phone
      },
      theme: {
        color: '#000000'
      },
      modal: {
        ondismiss: function() {
          alert("Payment cancelled");
        }
      }
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Form validation
    if (!formData.name || !formData.phone || !formData.address) {
      alert("Please fill all required fields");
      return;
    }

    if (Object.keys(cartItems).length === 0) {
      alert("Cart is empty");
      return;
    }

    try {
      let orderitems = [];
      for (const items in cartItems) {
        for (const item in cartItems[items]) {
          const iteminfo = products.find((product) => product._id === items);
          if (iteminfo) {
            const orderItem = {
              productId: iteminfo._id,
              name: iteminfo.name,
              price: iteminfo.price,
              size: item,
              quantity: cartItems[items][item]
            };
            orderitems.push(orderItem);
          }
        }
      }

      let orderdata = {
        userId: userData ? userData._id : null,
        address: formData,
        items: orderitems,
        amount: getCartAmount() + deliveryCharge,
      };

      switch (method) {
        case 'cod':
          { const codResult = await axios.post(`${serverUrl}/api/orders/placeorder`, orderdata, {
            withCredentials: true
          });
          if (codResult.data) {
            setCartItems({});
            navigate('/orders');
          }
          break; }

        case 'razorpay':
          { const razorpayResult = await axios.post(`${serverUrl}/api/orders/payorderbyrazorpay`, orderdata, {
            withCredentials: true
          });
          
          if (razorpayResult.data) {
            console.log("Razorpay order created:", razorpayResult.data);
            initPay(razorpayResult.data);
          } else {
            alert("Failed to create Razorpay order");
          }
          break; }

        default:
          alert("Select a payment method");
          break;
      }
    } catch (error) {
      console.error("Order placement error:", error);
      alert("Error placing order");
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <Title text1="Place" text2="Order" />
        
        <div className="mt-8 bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Shipping Information</h2>
          
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
            </div>
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <div>
              <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                Delivery Address *
              </label>
              <textarea
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                rows={3}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            
            <div className="border-t border-gray-200 pt-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Order Summary</h3>
              <CartOrder />
            </div>
            
            <div className="border-t border-gray-200 pt-6">
              <Title text1="Select" text2="Payment Method" />
              
              <div className="flex flex-wrap gap-4 mt-4">
                <button
                  type="button"
                  className={`px-6 py-3 rounded-lg border-2 font-medium transition-all ${
                    method === 'cod' 
                      ? 'border-black bg-black text-white' 
                      : 'border-gray-300 bg-white text-gray-700 hover:border-gray-400'
                  }`}
                  onClick={() => setMethod('cod')}
                >
                  Cash on Delivery
                </button>
                
                <button
                  type="button"
                  className={`px-6 py-3 rounded-lg border-2 font-medium transition-all ${
                    method === 'razorpay' 
                      ? 'border-black bg-black text-white' 
                      : 'border-gray-300 bg-white text-gray-700 hover:border-gray-400'
                  }`}
                  onClick={() => setMethod('razorpay')}
                >
                  Online Payment
                </button>
              </div>
              
              {method === 'razorpay' && (
                <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                  <p className="text-sm text-blue-700">
                    You will be redirected to a secure payment gateway to complete your transaction.
                  </p>
                </div>
              )}
            </div>
            
            <div className="border-t border-gray-200 pt-6">
              <button
                type="submit"
                className="w-full bg-black text-white py-3 px-6 rounded-md font-medium hover:bg-gray-800 transition-colors"
              >
                Place Order
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default PlaceOrder;