import React from 'react'
import Title from '../components/Title'
import { useContext,useState,useEffect } from 'react'

import { shopDataContext } from '../context/ShopContext'
import { authDataContext } from '../context/AuthContext'
import axios from 'axios'


function Order() {

    let [orderData,setOrderData]=useState([])
    
    let {serverUrl}=useContext(authDataContext)
    let {products}=useContext(shopDataContext)
    let {currency}=useContext(shopDataContext)


    const fetchOrders=async()=>{
        try{
            const response=await axios.post(`${serverUrl}/api/orders/userorders`,{},{
                withCredentials:true
            })
            let allOrders=[]
            if (response.data){
                
                response.data.map((order)=>{
                    order.items.map((item)=>{
                        item['image1']=products.find(p=>p._id===item.productId).image1
                        item['status']=order.status
                        item['paymentMethod']=order.paymentMethod
                        item['payment']=order.payment
                        item['date']=order.date
                        
                        allOrders.push(item)
                    })
                })
            }
            
            setOrderData(allOrders.reverse())
        }catch(err){
            console.error(err)
        }
    }
    useEffect(()=>{
        fetchOrders()
    },[])
  return (
    <div>
        <div>
            <Title text1={'Your'} text2={'Orders'}/>
        </div>
        <div>
            {orderData.map((item,index)=>{
                return (
                    <div key={index} className='flex gap-4 p-4 border-b'>   
                        <div><img src={item.image1} alt={item.name} className='h-24'/></div>
                        <div className='flex flex-col gap-2'>
                            <h1 className='text-xl font-bold'>{item.name}</h1>
                            <p className='text-md'>Price: {currency} {item.price}</p>
                            <p className='text-md'>Size: {item.size}</p>
                            <p className='text-md'>Quantity: {item.quantity}</p>
                            <p className='text-md'>Order Date: {new Date(item.date).toLocaleDateString()}</p>
                            <p className='text-md'>Payment Method: {item.paymentMethod}</p>
                            <p className='text-md'>Payment Status: {item.payment?'Paid':'Not Paid'}</p>
                            <p className='text-md'>Order Status: {item.status}</p>
                            <button className='border p-2 w-32 mt-4' onClick={()=>{fetchOrders()}}>Track order</button>

                        </div>

                    </div>
                    
                )
            }
            )}
        </div>
    </div>
  )
}

export default Order