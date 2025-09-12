import React from 'react'
import { useState } from 'react'
import upload from '../assets/react.svg'
import Sidebar from '../components/Sidebar';
import Nav from '../components/Nav';

import { useContext } from 'react';
import { authDataContext } from '../context/AuthContext';
import axios from 'axios';



function Add2() {
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
    formData.append('bestSeller', bestSeller);
    formData.append('description', description);
    formData.append('category', category);
    formData.append('subCategory', subCategory);
    formData.append('sizes', JSON.stringify(sizes));
    formData.append('price', price);
    const response = await axios.post(`${serverUrl}/api/products/addproduct`, formData, {withCredentials: true
    });
    console.log("Product added successfully:", response.data);
    if(response.date){
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
  
    <div>
      <Nav/>
      <Sidebar/>
      <h1>Add Product</h1>
      <form action="" className='flex flex-col justify-center gap-4 p-4' onSubmit={handleSubmit}>
        <label htmlFor='image1'>
          <img src={image1 ? URL.createObjectURL(image1) : upload} alt="Upload" />
          <input type="file" id='image1' onChange={(e) => setImage1(e.target.files[0])} style={{ display: 'none' }} />
        </label>

        <label htmlFor='image2'>
          <img src={image2 ? URL.createObjectURL(image2) : upload} alt="Upload" />
          <input type="file" id='image2' onChange={(e) => setImage2(e.target.files[0])} style={{ display: 'none' }} />
        </label>

        <label htmlFor='image3'>
          <img src={image3 ? URL.createObjectURL(image3) : upload} alt="Upload" />
          <input type="file" id='image3' onChange={(e) => setImage3(e.target.files[0])} style={{ display: 'none' }} />
        </label>

        <label htmlFor='image4'>
          <img src={image4 ? URL.createObjectURL(image4) : upload} alt="Upload" />
          <input type="file" id='image4' onChange={(e) => setImage4(e.target.files[0])} style={{ display: 'none' }} />
        </label>
        <div>
          <h2>Product Name</h2>
          <input type="text" onChange={(e) => setName(e.target.value)} value={name}  />
        </div>
        <div>
          <h2>Product Description</h2>
          <textarea onChange={(e) => setDescription(e.target.value)} value={description}></textarea>
        </div>
        <div>
          <h2>Product Category</h2>
          <select onChange={(e) => setCategory(e.target.value)}>
            <option value="Men">Men</option>
            <option value="Women">Women</option>
            <option value="Kids">Kids</option>
          </select>
        </div>
        <div>
          <h2>Sub Category</h2>
          <select onChange={(e) => setSubCategory(e.target.value)}>
            <option value="topwear">Topwear</option>
            <option value="bottomwear">Bottomwear</option>
            <option value="winterwear">Winterwear</option>
          </select>
        </div>
        <div>
          <h2>Sizes</h2>
          <div>
            <div className={`'px-[20px] py-[7px] rounded-lg bg-slate-600 text-[18px] ' ${sizes.includes("s") ? "bg-blue-500" : ""}`} onClick={() =>setSizes(prev=>prev.includes("s")?prev.filter(size => size !== "s"): [...prev, "s"]) }>S</div>
            <div className={`'px-[20px] py-[7px] rounded-lg bg-slate-600 text-[18px] ' ${sizes.includes("m") ? "bg-blue-500" : ""}`} onClick={() => setSizes(prev=>prev.includes("m")?prev.filter(size => size !== "m"): [...prev, "m"]) }>M</div>
            <div className={`'px-[20px] py-[7px] rounded-lg bg-slate-600 text-[18px] ' ${sizes.includes("l") ? "bg-blue-500" : ""}`} onClick={() => setSizes(prev=>prev.includes("l")?prev.filter(size => size !== "l"): [...prev, "l"]) }>L</div>
            <div className={`'px-[20px] py-[7px] rounded-lg bg-slate-600 text-[18px] ' ${sizes.includes("xl") ? "bg-blue-500" : ""}`} onClick={() => setSizes(prev=>prev.includes("xl")?prev.filter(size => size !== "xl"): [...prev, "xl"]) }>XL</div>
          </div>

        </div>
        <div>
          <h2>Price</h2>
          <input type="number" placeholder="Enter price rupees" />
        </div>
        <div>
          <h2>Best Seller</h2>
          <input type="checkbox" onChange={() => setBestSeller(prev => !prev)} checked={bestSeller} />
        </div>
        <button type="submit">Add Product</button>
      </form>
    </div>
  )
}

export default Add2