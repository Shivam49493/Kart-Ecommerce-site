import React from 'react'
import { createContext } from 'react';
import { useState,useEffect,useContext } from 'react';           
import { authDataContext } from './AuthContext';
import axios from 'axios';
import { userDataContext } from './UserContext';



export  const shopDataContext = createContext();

function ShopContext({children}) {
    let [products, setProducts] = useState([]);
    let currency='INR';
    let deliveryCharge=50;
    let {serverUrl} = React.useContext(authDataContext);
    let {userData}=useContext(userDataContext);
    let [showSearch,setShowSearch]=useState(false);
    let [search,setSearch]=useState(false)
    let [cartItems,setCartItems]=useState({})
    let cartData = structuredClone(cartItems);
    


    const addToCart = (id, size) => {
        if (!size) {
            alert('Please select a size');
            return;
        }
        let cartData = structuredClone(cartItems);
        if (cartData[id]) {
            if (cartData[id][size]) {
                cartData[id][size] += 1;
            } else {
                cartData[id][size] = 1;
            }
        } else {
            cartData[id] = {};
            cartData[id][size] = 1;
        }
        setCartItems(cartData);
        alert('Item added to cart');
        if (userData) {
            axios.post(`${serverUrl}/api/cart/add`, { productId: id, size: size }, {
                withCredentials: true  
            }).then((res) => {
                console.log(res.data);
            }   

            ).catch((err) => {
                console.error(err);
            }       
        )
    }
}
    let cartData1=cartData;
    const getCartCount=()=>{
            let count=0;        
            for (let items in cartData1){
                for (let size in cartData1[items]){
                    try{
                        if(cartData1[items][size]>0){
                            count+=cartData1[items][size]
                        }
                    }catch(err){
                        console.log(err)
                    }   
                }
            }
            return count;
    }
    const getCartAmount=()=>{
        let amount=0;   
        for (let items in cartData1){
            let iteminfo=products.find((product)=>product._id==items)
            for (let size in cartData1[items]){
                try{    
                    if(cartData1[items][size]>0){
                        amount+=cartData1[items][size]*iteminfo.price
                    }
                }catch(err){
                    console.log(err)
                }
            }
        }
        return amount;
    }
    const getUserCart=async()=>{
        try{
            const response=await axios.get(`${serverUrl}/api/cart/get`,{},{withCredentials:true});     
            console.log('Cart data fetched:',response.data);
            if(response.status!==200){
                throw new Error('Failed to fetch cart data');
            }
            setCartItems(response.data);
        }catch(error){
            console.error('Error fetching cart data:',error);
        }  
    }
    useEffect(()=>{
       getUserCart();
    }   ,[]) 


    const updateQuantity=async(id,size,quantity)=>{
        let cartData=structuredClone(cartItems);
        if(cartData[id] && cartData[id][size]){
            cartData[id][size]=quantity;
        }
        setCartItems(cartData);

        if(userData){   
            try{
                const response=await axios.post(`${serverUrl}/api/cart/update`,{productId:id,size:size,quantity:quantity},{withCredentials:true});
                console.log('Cart updated:',response.data);
            }
            catch(error){
                console.error('Error updating cart:',error);
            }   
            
        
            }
        }

    const getProducts = async () => {
        try {
            const response = await axios.get(`${serverUrl}/api/products/list`, { withCredentials: true
            });
            console.log('Products fetched:', response.data);
            if (response.status !== 200) {
                throw new Error('Failed to fetch products');
            }
            setProducts(response.data);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    }
    useEffect(() => {
        getProducts();
    }, []);


    let value = {products, currency, deliveryCharge, getProducts,updateQuantity,showSearch,setShowSearch,search,setSearch,cartItems,setCartItems,getCartCount,addToCart, getCartAmount};
  return (
    <shopDataContext.Provider value={value}>
      {children}
    </shopDataContext.Provider>
  )
}



export default ShopContext