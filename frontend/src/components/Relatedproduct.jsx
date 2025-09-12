
import React from 'react'
import { shopDataContext } from '../context/ShopContext'
import { useContext,useState,useEffect } from 'react'; 
import Title from './Title';
import Card from './Card';

function Relatedproduct({category, subCategory,currentProductId}) {

    let {products} = useContext(shopDataContext);
    let [relatedProducts, setRelatedProducts] = useState([]);

    useEffect(() => {
        if (products.length>0){
            let filteredProducts=products.slice();
        filteredProducts = products.filter(item => 
            (item.category === category || item.subCategory === subCategory) && item._id !== currentProductId
        );
        setRelatedProducts(filteredProducts.slice(0, 4)); 
        }// Get up to 4 related products
    }, [products, category, subCategory, currentProductId]);

  return (
    <div>
        <div>
            <Title text1={'Related '} text2={'Products'}/>
        </div>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
            {
                relatedProducts.map((item,index) => (
                    <Card key={index} name={item.name} image={item.image1} id={item._id} price={item.price} />
                ))
            }   
        </div>

    </div>
  )
}

export default Relatedproduct