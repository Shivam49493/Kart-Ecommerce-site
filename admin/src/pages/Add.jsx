import React, { useState, useContext } from 'react';
import upload from '../assets/react.svg';
import Sidebar from '../components/Sidebar';
import Nav from '../components/Nav';
import { authDataContext } from '../context/AuthContext';
import axios from 'axios';

function Add() {
  let [image1, setImage1] = useState(null);
  let [image2, setImage2] = useState(null);
  let [image3, setImage3] = useState(null);
  let [image4, setImage4] = useState(null);
  let [name, setName] = useState("");
  let [bestSeller, setBestSeller] = useState(false);   
  let [description, setDescription] = useState("");
  let [category, setCategory] = useState("Men");
  let [subCategory, setSubCategory] = useState("topwear");
  let [sizes, setSizes] = useState([]);
  let [price, setPrice] = useState(0);
  let { serverUrl } = useContext(authDataContext);

  const handleSubmit = async(e) => {
    e.preventDefault(); 
    try{
      const formData = new FormData();
      formData.append('image1', image1);
      formData.append('image2', image2);
      formData.append('image3', image3);
      formData.append('image4', image4);
      formData.append('name', name);
      
      formData.append('description', description);
      formData.append('category', category);
      formData.append('subCategory', subCategory);
      formData.append('sizes', JSON.stringify(sizes));
      formData.append('price', price);
      formData.append('bestSeller', bestSeller);
      
      const response = await axios.post(`${serverUrl}/api/products/addproduct`, formData, {
        withCredentials: true
      });
      
      console.log("Product added successfully:", response.data);
      
      if(response.data){
        setImage1(null);
        setImage2(null);
        setImage3(null);
        setImage4(null);
        setName("");
        setBestSeller(false);   
        setDescription("");
        setCategory("Men");   
        setSubCategory("topwear");
        setSizes([]);
        setPrice(0);
      }
    }
    catch(error){
      console.error("Error adding product:", error);
    }
  }

  return (
    <div className="flex">
      <Sidebar/>
      <div className="flex-1 ml-64"> {/* Adjust margin based on your sidebar width */}
        <Nav/>
        <div className="p-6">
          <h1 className="text-2xl font-bold mb-6">Add Product</h1>
          <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Image Upload Section */}
              <div className="col-span-2">
                <h2 className="text-lg font-semibold mb-3">Product Images</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                 
                   <label 
                       
                      htmlFor=  'image1'
                      className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg h-40 cursor-pointer hover:border-blue-500 transition-colors"
                    >
                      <img 
                        src={image1 ? URL.createObjectURL(image1) : upload} alt="Upload"
                        className="h-20 w-20 object-contain mb-2"
                      />
                      <span className="text-sm text-gray-500">Image1</span>
                      <input 
                        type="file" id='image1' onChange={(e) => setImage1(e.target.files[0])} style={{ display: 'none' }}
                      />
                    </label>
                    <label 
                       
                      htmlFor=  'image2'
                      className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg h-40 cursor-pointer hover:border-blue-500 transition-colors"
                    >
                      <img 
                        src={image2 ? URL.createObjectURL(image2) : upload} alt="Upload"
                        className="h-20 w-20 object-contain mb-2"
                      />
                      <span className="text-sm text-gray-500">Image2</span>
                      <input 
                        type="file" id='image2' onChange={(e) => setImage2(e.target.files[0])} style={{ display: 'none' }}
                      />
                    </label>
                    <label 
                       
                      htmlFor=  'image3'
                      className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg h-40 cursor-pointer hover:border-blue-500 transition-colors"
                    >
                      <img 
                        src={image3 ? URL.createObjectURL(image3) : upload} alt="Upload"
                        className="h-20 w-20 object-contain mb-2"
                      />
                      <span className="text-sm text-gray-500">Image3</span>
                      <input 
                        type="file" id='image3' onChange={(e) => setImage3(e.target.files[0])} style={{ display: 'none' }}
                      />
                    </label>
                    <label 
                       
                      htmlFor=  'image4'
                      className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg h-40 cursor-pointer hover:border-blue-500 transition-colors"
                    >
                      <img 
                        src={image4 ? URL.createObjectURL(image4) : upload} alt="Upload"
                        className="h-20 w-20 object-contain mb-2"
                      />
                      <span className="text-sm text-gray-500">Image4</span>
                      <input 
                        type="file" id='image4' onChange={(e) => setImage4(e.target.files[0])} style={{ display: 'none' }}
                      />
                    </label>
                  
                </div>
              </div>

              {/* Product Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Product Name</label>
                <input 
                  type="text" 
                  onChange={(e) => setName(e.target.value)} 
                  value={name}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter product name"
                />
              </div>

              {/* Price */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Price (₹)</label>
                <input 
                  type="number" 
                  onChange={(e) => setPrice(e.target.value)} 
                  value={price}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter price"
                />
              </div>

              {/* Category */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                <select 
                  onChange={(e) => setCategory(e.target.value)} 
                  value={category}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="Men">Men</option>
                  <option value="Women">Women</option>
                  <option value="Kids">Kids</option>
                </select>
              </div>

              {/* Sub Category */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Sub Category</label>
                <select 
                  onChange={(e) => setSubCategory(e.target.value)} 
                  value={subCategory}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="topwear">Topwear</option>
                  <option value="bottomwear">Bottomwear</option>
                  <option value="winterwear">Winterwear</option>
                </select>
              </div>

              {/* Sizes */}
              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">Sizes</label>
                <div className="flex space-x-3">
                  {['s', 'm', 'l', 'xl'].map((size) => (
                    <div 
                      key={size}
                      className={`px-5 py-2 rounded-lg cursor-pointer transition-colors ${sizes.includes(size) ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-800"}`}
                      onClick={() => setSizes(prev => 
                        prev.includes(size) 
                          ? prev.filter(s => s !== size) 
                          : [...prev, size]
                      )}
                    >
                      {size.toUpperCase()}
                    </div>
                  ))}
                </div>
              </div>

              {/* Description */}
              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea 
                  onChange={(e) => setDescription(e.target.value)} 
                  value={description}
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter product description"
                ></textarea>
              </div>

              {/* Best Seller */}
              <div className="col-span-2 flex items-center">
                <input 
                  type="checkbox" 
                  id="bestSeller"
                  onChange={() => setBestSeller(prev => !prev)} 
                  checked={bestSeller} 
                  className="h-4 w-4 text-blue-500 focus:ring-blue-400 border-gray-300 rounded"
                />
                <label htmlFor="bestSeller" className="ml-2 block text-sm text-gray-900">
                  Mark as Best Seller
                </label>
              </div>
            </div>

            {/* Submit Button */}
            <div className="mt-6">
              <button 
                type="submit" 
                className="px-6 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition-colors"
              >
                Add Product
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Add;