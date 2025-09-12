import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { shopDataContext } from '../context/ShopContext';
import Relatedproduct from '../components/Relatedproduct';
import { FaStar, FaRegStar, FaShoppingCart, FaHeart, FaShare } from 'react-icons/fa';

function ProductDetail() {
  let { id } = useParams();
  let { products, currency, addToCart } = useContext(shopDataContext);
  
  let [productData, setProductData] = useState(null);
  const [selectedImage, setSelectedImage] = useState('');
  const [size, setSize] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');
  const [addedToCart, setAddedToCart] = useState(false);

  useEffect(() => {
    if (products && id) {
      const product = products.find(item => item._id === id);
      if (product) {
        setProductData(product);
        setSelectedImage(product.image1);
      }
    }
  }, [products, id]);

  const handleAddToCart = () => {
    if (!size) {
      alert('Please select a size');
      return;
    }
    addToCart(productData._id, size, quantity);
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  const incrementQuantity = () => {
    setQuantity(prev => prev + 1);
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };

  if (!productData) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumbs */}
      <nav className="flex mb-6" aria-label="Breadcrumb">
        <ol className="flex items-center space-x-2">
          <li>
            <div className="flex items-center">
              <a href="/" className="text-sm font-medium text-gray-500 hover:text-gray-700">Home</a>
            </div>
          </li>
          <li>
            <div className="flex items-center">
              <svg className="flex-shrink-0 h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                <path d="M5.555 17.776l8-16 .894.448-8 16-.894-.448z" />
              </svg>
              <a href="/collection" className="ml-2 text-sm font-medium text-gray-500 hover:text-gray-700">Collection</a>
            </div>
          </li>
          <li>
            <div className="flex items-center">
              <svg className="flex-shrink-0 h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                <path d="M5.555 17.776l8-16 .894.448-8 16-.894-.448z" />
              </svg>
              <span className="ml-2 text-sm font-medium text-gray-500">{productData.category}</span>
            </div>
          </li>
        </ol>
      </nav>

      <div className="lg:grid lg:grid-cols-2 lg:gap-x-8">
        {/* Image gallery */}
        <div className="flex flex-col-reverse lg:flex-row">
          {/* Thumbnails */}
          <div className="hidden lg:flex lg:flex-col lg:mr-4 lg:space-y-4">
            <div 
              className={`w-20 h-20 rounded-md overflow-hidden cursor-pointer border-2 ${selectedImage === productData.image1 ? 'border-indigo-500' : 'border-gray-200'}`}
              onClick={() => setSelectedImage(productData.image1)}
            >
              <img src={productData.image1} alt="Thumbnail 1" className="w-full h-full object-cover" />
            </div>
            <div 
              className={`w-20 h-20 rounded-md overflow-hidden cursor-pointer border-2 ${selectedImage === productData.image2 ? 'border-indigo-500' : 'border-gray-200'}`}
              onClick={() => setSelectedImage(productData.image2)}
            >
              <img src={productData.image2} alt="Thumbnail 2" className="w-full h-full object-cover" />
            </div>
            <div 
              className={`w-20 h-20 rounded-md overflow-hidden cursor-pointer border-2 ${selectedImage === productData.image3 ? 'border-indigo-500' : 'border-gray-200'}`}
              onClick={() => setSelectedImage(productData.image3)}
            >
              <img src={productData.image3} alt="Thumbnail 3" className="w-full h-full object-cover" />
            </div>
          </div>

          {/* Main image */}
          <div className="w-full">
            <div className="aspect-w-1 aspect-h-1 rounded-lg overflow-hidden bg-gray-100">
              <img src={selectedImage} alt={productData.name} className="w-full h-full object-center object-cover" />
            </div>
            
            {/* Mobile thumbnails */}
            <div className="lg:hidden mt-4 flex space-x-4 overflow-x-auto">
              <div 
                className={`w-16 h-16 flex-shrink-0 rounded-md overflow-hidden cursor-pointer border-2 ${selectedImage === productData.image1 ? 'border-indigo-500' : 'border-gray-200'}`}
                onClick={() => setSelectedImage(productData.image1)}
              >
                <img src={productData.image1} alt="Thumbnail 1" className="w-full h-full object-cover" />
              </div>
              <div 
                className={`w-16 h-16 flex-shrink-0 rounded-md overflow-hidden cursor-pointer border-2 ${selectedImage === productData.image2 ? 'border-indigo-500' : 'border-gray-200'}`}
                onClick={() => setSelectedImage(productData.image2)}
              >
                <img src={productData.image2} alt="Thumbnail 2" className="w-full h-full object-cover" />
              </div>
              <div 
                className={`w-16 h-16 flex-shrink-0 rounded-md overflow-hidden cursor-pointer border-2 ${selectedImage === productData.image3 ? 'border-indigo-500' : 'border-gray-200'}`}
                onClick={() => setSelectedImage(productData.image3)}
              >
                <img src={productData.image3} alt="Thumbnail 3" className="w-full h-full object-cover" />
              </div>
            </div>
          </div>
        </div>

        {/* Product info */}
        <div className="mt-10 px-4 sm:px-0 sm:mt-16 lg:mt-0">
          <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">{productData.name}</h1>
          
          <div className="mt-3">
            <h2 className="sr-only">Product information</h2>
            <p className="text-3xl text-gray-900 font-bold">{currency} {productData.price}</p>
          </div>

          {/* Reviews */}
          <div className="mt-3">
            <div className="flex items-center">
              <div className="flex items-center">
                {[0, 1, 2, 3, 4].map((rating) => (
                  <span key={rating} className="text-yellow-400">
                    {rating < 4 ? <FaStar /> : <FaRegStar />}
                  </span>
                ))}
              </div>
              <p className="ml-2 text-sm text-gray-500">24 reviews</p>
            </div>
          </div>

          <div className="mt-6">
            <h3 className="sr-only">Description</h3>
            <div className="text-base text-gray-700 space-y-6">
              <p>{productData.description}</p>
            </div>
          </div>

          {/* Sizes */}
          <div className="mt-6">
            <div className="flex items-center justify-between">
              <h3 className="text-sm text-gray-600 font-medium">Size</h3>
              <a href="#" className="text-sm font-medium text-indigo-600 hover:text-indigo-500">Size guide</a>
            </div>

            <fieldset className="mt-4">
              <legend className="sr-only">Choose a size</legend>
              <div className="grid grid-cols-4 gap-4 sm:grid-cols-8 lg:grid-cols-4">
                {productData.sizes.map((item, index) => (
                  <div key={index} className="relative">
                    <input 
                      type="radio" 
                      name="size-choice" 
                      value={item} 
                      id={`size-${item}`}
                      className="sr-only" 
                      onChange={() => setSize(item)}
                    />
                    <label 
                      htmlFor={`size-${item}`} 
                      className={`flex items-center justify-center h-10 rounded-md border cursor-pointer text-sm font-medium uppercase ${size === item ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-white text-gray-900 border-gray-200'}`}
                    >
                      {item}
                    </label>
                  </div>
                ))}
              </div>
            </fieldset>
          </div>

          {/* Quantity selector */}
          <div className="mt-6">
            <h3 className="text-sm text-gray-600 font-medium">Quantity</h3>
            <div className="flex items-center mt-2">
              <button 
                onClick={decrementQuantity}
                className="p-2 rounded-md border border-gray-300 text-gray-600 hover:bg-gray-100"
              >
                <span className="sr-only">Decrease quantity</span>
                -
              </button>
              <span className="px-4 py-2 border-t border-b border-gray-300 text-gray-900">{quantity}</span>
              <button 
                onClick={incrementQuantity}
                className="p-2 rounded-md border border-gray-300 text-gray-600 hover:bg-gray-100"
              >
                <span className="sr-only">Increase quantity</span>
                +
              </button>
            </div>
          </div>

          {/* Add to cart button */}
          <div className="mt-10 flex flex-col sm:flex-row sm:space-x-4">
            <button
              onClick={handleAddToCart}
              disabled={addedToCart}
              className={`flex-1 flex items-center justify-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white ${addedToCart ? 'bg-green-600' : 'bg-indigo-600 hover:bg-indigo-700'} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
            >
              <FaShoppingCart className="mr-2" />
              {addedToCart ? 'Added to Cart' : 'Add to Cart'}
            </button>
            
            <button
              type="button"
              className="mt-3 sm:mt-0 flex-1 inline-flex items-center justify-center px-6 py-3 border border-gray-300 rounded-md shadow-sm text-base font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <FaHeart className="mr-2 text-red-400" />
              Save to Wishlist
            </button>
          </div>

          {/* Share buttons */}
          <div className="mt-6 flex items-center space-x-4">
            <span className="text-sm text-gray-500">Share this product:</span>
            <div className="flex space-x-2">
              <a href="#" className="text-gray-400 hover:text-gray-500">
                <FaShare className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Product details and reviews tabs */}
      <div className="mt-16 border-t border-gray-200 pt-16">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab('description')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'description' ? 'border-indigo-500 text-indigo-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
            >
              Description
            </button>
            <button
              onClick={() => setActiveTab('details')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'details' ? 'border-indigo-500 text-indigo-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
            >
              Details
            </button>
            <button
              onClick={() => setActiveTab('reviews')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'reviews' ? 'border-indigo-500 text-indigo-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
            >
              Reviews
            </button>
          </nav>
        </div>

        <div className="py-8">
          {activeTab === 'description' && (
            <div className="prose prose-indigo max-w-none">
              <p>{productData.description}</p>
              <ul className="mt-4">
                <li>Premium quality materials</li>
                <li>Designed for comfort and style</li>
                <li>Eco-friendly production process</li>
              </ul>
            </div>
          )}
          
          {activeTab === 'details' && (
            <div className="prose prose-indigo max-w-none">
              <h3>Product Details</h3>
              <ul>
                <li><strong>Material:</strong> 100% Organic Cotton</li>
                <li><strong>Care:</strong> Machine wash cold with like colors</li>
                <li><strong>Origin:</strong> Made in India</li>
                <li><strong>SKU:</strong> {productData._id}</li>
              </ul>
            </div>
          )}
          
          {activeTab === 'reviews' && (
            <div>
              <h3 className="text-lg font-medium text-gray-900">Customer Reviews</h3>
              <p className="mt-2 text-gray-600">No reviews yet. Be the first to review this product!</p>
              <button className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                Write a Review
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Related products */}
      <div className="mt-16">
        <h2 className="text-2xl font-extrabold tracking-tight text-gray-900">You may also like</h2>
        <Relatedproduct 
          category={productData.category} 
          subCategory={productData.subCategory} 
          currentProductId={productData._id}
        />
      </div>
    </div>
  );
}

export default ProductDetail;