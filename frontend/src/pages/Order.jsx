import React, { useContext, useState, useEffect } from 'react';
import Title from '../components/Title';
import { shopDataContext } from '../context/ShopContext';
import { authDataContext } from '../context/AuthContext';
import axios from 'axios';
import { FiRefreshCw, FiPackage, FiCheckCircle, FiTruck, FiClock } from 'react-icons/fi';

function Order() {
  let [orderData, setOrderData] = useState([]);
  let [isLoading, setIsLoading] = useState(true);
  let { serverUrl } = useContext(authDataContext);
  let { products } = useContext(shopDataContext);
  let { currency } = useContext(shopDataContext);

  const getStatusIcon = (status) => {
    switch (status) {
      case 'pending':
        return <FiClock className="h-5 w-5 text-yellow-500" />;
      case 'processing':
        return <FiPackage className="h-5 w-5 text-blue-500" />;
      case 'shipped':
        return <FiTruck className="h-5 w-5 text-indigo-500" />;
      case 'delivered':
        return <FiCheckCircle className="h-5 w-5 text-green-500" />;
      default:
        return <FiPackage className="h-5 w-5 text-gray-500" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'processing':
        return 'bg-blue-100 text-blue-800';
      case 'shipped':
        return 'bg-indigo-100 text-indigo-800';
      case 'delivered':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const fetchOrders = async () => {
    setIsLoading(true);
    try {
      const response = await axios.post(`${serverUrl}/api/orders/userorders`, {}, {
        withCredentials: true
      });
      let allOrders = [];
      if (response.data) {
        response.data.map((order) => {
          order.items.map((item) => {
            const product = products.find(p => p._id === item.productId);
            if (product) {
              item['image1'] = product.image1;
              item['name'] = product.name || 'Product';
              item['status'] = order.status;
              item['paymentMethod'] = order.paymentMethod;
              item['payment'] = order.payment;
              item['date'] = order.date;
              item['orderId'] = order._id;
              allOrders.push(item);
            }
          });
        });
      }
      setOrderData(allOrders.reverse());
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Title text1={'Your'} text2={'Orders'} />
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl center font-extrabold text-gray-900 sm:text-4xl">Your Orders</h2>
        
        
        {orderData.length === 0 ? (
          <div className="text-center py-12">
            <div className="inline-flex items-center justify-center rounded-full bg-gray-100 p-4 mb-4">
              <FiPackage className="h-12 w-12 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No orders yet</h3>
            <p className="text-gray-500 mb-6">Your orders will appear here once you make a purchase.</p>
            <button 
              onClick={() => window.location.href = '/collection'}
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Start Shopping
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="flex justify-between items-center mb-6">
              <p className="text-sm text-gray-600">
                {orderData.length} {orderData.length === 1 ? 'order' : 'orders'} found
              </p>
              <button
                onClick={fetchOrders}
                className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <FiRefreshCw className="mr-2 h-4 w-4" />
                Refresh
              </button>
            </div>

            {orderData.map((item, index) => (
              <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden transition-all duration-200 hover:shadow-md">
                <div className="p-6 sm:flex sm:items-start sm:justify-between">
                  <div className="flex-1 sm:flex sm:items-start">
                    <div className="flex-shrink-0">
                      <img 
                        src={item.image1} 
                        alt={item.name} 
                        className="h-20 w-20 object-cover rounded-lg sm:h-24 sm:w-24" 
                      />
                    </div>
                    <div className="mt-4 sm:mt-0 sm:ml-6">
                      <h3 className="text-lg font-medium text-gray-900">{item.name}</h3>
                      <div className="mt-2 flex flex-col sm:flex-row sm:flex-wrap sm:space-x-6">
                        <p className="flex items-center text-sm text-gray-500">
                          <span className="font-medium">Price:</span> {currency} {item.price}
                        </p>
                        <p className="flex items-center text-sm text-gray-500">
                          <span className="font-medium">Size:</span> {item.size}
                        </p>
                        <p className="flex items-center text-sm text-gray-500">
                          <span className="font-medium">Qty:</span> {item.quantity}
                        </p>
                        <p className="flex items-center text-sm text-gray-500">
                          <span className="font-medium">Total:</span> {currency} {(item.price * item.quantity).toFixed(2)}
                        </p>
                      </div>
                      <div className="mt-2 flex items-center">
                        <span className="flex items-center text-sm text-gray-500">
                          <span className="font-medium">Ordered on:</span> {new Date(item.date).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 sm:mt-0 sm:ml-6 sm:flex-shrink-0">
                    <div className="flex items-center">
                      {getStatusIcon(item.status)}
                      <span className={`ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(item.status)}`}>
                        {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="border-t border-gray-200 bg-gray-50 px-6 py-4 sm:px-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-sm text-gray-500">
                      <span className="font-medium">Payment:</span>
                      <span className="ml-2 capitalize">{item.paymentMethod}</span>
                      <span className={`ml-3 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${item.payment ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                        {item.payment ? 'Paid' : 'Pending'}
                      </span>
                    </div>
                    <button 
                      className="inline-flex items-center px-3 py-1.5 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Order;