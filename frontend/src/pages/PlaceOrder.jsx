import React, { useState, useContext, useEffect } from 'react'
import CartOrder from '../components/CartOrder'
import Order from './Order'
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
    name: '',
    email: '',
    phone: '',
    address: ''
  })

  // Load Razorpay script
  useEffect(() => {
    const loadRazorpayScript = () => {
      return new Promise((resolve) => {
        const script = document.createElement('script');
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
      key: import.meta.env.VITE_RAZORPAY_KEY_ID, // Make sure you use VITE_ prefix for Vite env variables
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
            orderId: orderData.receipt // Your database order ID
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
    <div>
      <h1>Place Order</h1>
      <div>
        <form className='flex flex-col gap-4 border p-4 w-1/2 mx-auto mt-10'>
          <div className='flex flex-col gap-2'>
            <label htmlFor="name">Name *</label>
            <input type="text" id='name' className='border p-2' onChange={handleChange} name='name' value={formData.name} required />
          </div>
          <div className='flex flex-col gap-2'>
            <label htmlFor="phone">Phone *</label>
            <input type="text" id='phone' className='border p-2' onChange={handleChange} name='phone' value={formData.phone} required />
          </div>
          <div className='flex flex-col gap-2'>
            <label htmlFor="email">Email</label>
            <input type="email" id='email' className='border p-2' onChange={handleChange} name='email' value={formData.email} />
          </div>
          <div className='flex flex-col gap-2'>
            <label htmlFor="address">Address *</label>
            <textarea id='address' className='border p-2' name='address' onChange={handleChange} value={formData.address} required />
          </div>

          <div><CartOrder /></div>
          
          <div>
            <Title text1={'Select'} text2={'Payment Method'} />
            <button type='button' className={`border p-2 mr-4 ${method === 'cod' ? 'bg-black text-white' : ''}`} onClick={() => setMethod('cod')}>
              Cash on Delivery
            </button>
            <button type='button' className={`border p-2 ${method === 'razorpay' ? 'bg-black text-white' : ''}`} onClick={() => setMethod('razorpay')}>
              Online Payment
            </button>
          </div>
          
          <button type='submit' className='border p-2 bg-black text-white' onClick={handleSubmit}>
            Place Order
          </button>
        </form>
      </div>
    </div>
  )
}

export default PlaceOrder 