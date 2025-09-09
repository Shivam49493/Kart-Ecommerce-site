import React from 'react'
import { useParams } from 'react-router-dom';
import { useContext,useEffect,useState } from 'react';
import { shopDataContext } from '../context/ShopContext';
import Relatedproduct from '../components/Relatedproduct';
function ProductDetail() {
    let {id} = useParams();
    let {products,currency,addToCart,getCartCount,cartItems} = useContext(shopDataContext);
    
    let [productData,setProductData]=useState(false)

    const [image,setImage]= useState('')
    const [image1,setImage1]= useState('')
    const [image2,setImage2]= useState('')
    const [image3,setImage3]= useState('')
    const [size,setSize]= useState('')

    const getProductData=()=>{
        products.map((item)=>{
            if (item._id==id){
                setProductData(item)
                console.log(item)
                setImage(item.image1)
                setImage1(item.image1)
                setImage2(item.image2)
                setImage3(item.image3)
                return null;
            }


            })
       }
       useEffect(()=>{
        getProductData()
       },[products,id])


           


  return productData? (
    <div>
        <div>
            <div className='flex gap-4'>    
                <div className='flex flex-col gap-4'>
                    <img src={image1} alt='image1' className='h-24 border p-2' onClick={()=>setImage(image1)}/>
                    <img src={image2} alt='image2' className='h-24 border p-2' onClick={()=>setImage(image2)}/>
                    <img src={image3} alt='image3' className='h-24 border p-2' onClick={()=>setImage(image3)}/>
                </div>
                <div>
                    <img src={image} alt='mainImage' className='h-96'/>
                </div>
                <div className='flex flex-col gap-4'>
                    <h1 className='text-2xl font-bold'>{productData.name.toUpperCase()}</h1>
                    <p className='text-xl font-bold'>{currency} {productData.price}</p>     

                    <p className='text-md'>{productData.description}</p>
                    <div className='flex gap-4'>{
                        productData.sizes.map((item,index)=>(
                            <button key={index} className={`border p-2 ${size==item?'bg-black text-white':''}`} onClick={()=>setSize(item)}>{item}</button>
                        ))
                    }

                    </div>
                    <button className='bg-blue-500 text-white p-2 rounded-md w-48' onClick={()=>addToCart(productData._id,size)}>Add to Cart</button>
                </div>
            </div>
            <div>
                <Relatedproduct category={productData.category} subCategory={productData.subCategory} currentProductId={productData._id}/>
            </div>
            <div>
                <h1 className='text-2xl font-bold'>Reviews</h1>
                <p>No reviews yet</p>
            </div>
        </div>
    </div>
  ):<div>
    Loading....
  </div>
}

export default ProductDetail