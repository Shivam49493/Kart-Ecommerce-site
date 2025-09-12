import React from 'react'

import { useContext, useEffect, useState } from 'react';
import { shopDataContext } from '../context/ShopContext';
import Title from './Title';
import Card from './Card';

function Bestseller() {
  const { products } = useContext(shopDataContext);
  const [bestsellers, setBestsellers] = useState([]);

  useEffect(() => {
    let filtered = products.filter((item) => !item.bestSeller);
    setBestsellers(filtered.slice(0, 4)); // Get top 4 bestsellers
  
  }, [products]);

  return (
    <div className='grid grid-row-3  p-10 gap-10 grid-cols-3 gap-4'>
        
        {bestsellers.map((item,index) => (
            <Card key={index} name={item.name} image={item.image1} id={item._id} price={item.price} />
        ))}

    </div>
  )
}

export default Bestseller