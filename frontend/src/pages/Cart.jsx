import React from 'react'
import { useContext,useState,useEffect } from 'react';
import { shopDataContext } from '../context/ShopContext';
import Title from '../components/Title';
import { useNavigate } from 'react-router';

import CartOrder from '../components/CartOrder';


function Cart() {

    let {cartItems,products,currency,updateQuantity}=useContext(shopDataContext);
    let [cartData,setCartData]=useState([]);
    let navigate=useNavigate();

    useEffect(()=>{
        const tempData=[];
        for (let item in cartItems){
            for (let size in cartItems[item]){
                if (cartItems[item][size]>0){tempData.push({_id:item,size:size,quantity:cartItems[item][size]})}
            }
        setCartData(tempData)
        console.log(cartData)

        }
    },[cartItems])


    
  return (
    <div>
        <Title text1={'Your'} text2={'Cart'}/>
        {cartData.length==0 && <div className='text-center mt-20'>
            <h1 className='text-2xl font-bold'>Your cart is empty</h1>
            <button className='border p-2 mt-4' onClick={()=>navigate('/collection')}>Shop Now</button>
        </div>}
        {
            cartData.map((item,index)=>{
                let productData=products.find(product=>product._id==item._id)   
                return (
                    <div key={index} className='flex gap-4 p-4 border-b'>
                        <div><img src={productData.image1} alt={productData.name} className='h-24'/></div>
                        <div className='flex flex-col gap-2'>
                            <h1 className='text-xl font-bold'>{productData.name}</h1>
                            <p className='text-md'>Price: {currency} {productData.price}</p>
                            <p className='text-md'>Size: {item.size}</p>
                        </div>
                        <div className='flex flex-col gap-2'>
                            <p className='text-md'>Quantity:</p>
                            <input type='number' value={item.quantity} className='border w-20 p-2' onChange={(e)=>e.target.value===' '||e.target.value===0?null:updateQuantity(item._id,item.size,Number(e.target.value))}/>
                            <button onClick={()=>updateQuantity(item._id,item.size,0)}>delete </button>
                        </div>
                        <div className='flex flex-col gap-2'>
                            <p className='text-md'>Total:</p>
                            <p className='text-md font-bold'>{currency} {productData.price * item.quantity}</p>
                        </div>      

                    </div>
                )
            })
        }
        <div><CartOrder/></div>
        <button className='border p-2 m-4' onClick={()=>navigate('/placeorder')}>PlaceOrder</button>
                            

        </div>
  )
}

export default Cart