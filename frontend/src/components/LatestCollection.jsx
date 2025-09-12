import React from 'react'
import Title from './Title'
import { shopDataContext } from '../context/ShopContext'
import { useContext } from 'react';
import Card from './Card'

function LatestCollection() {
    let {products} = useContext(shopDataContext);
    let [latestProducts, setLatestProducts] = React.useState([]);

    React.useEffect(() => {
        let sortedProducts = [...products].sort((a, b) => new Date(b.addedDate) - new Date(a.addedDate));
        setLatestProducts(sortedProducts.slice(0, 4)); // Get the latest 4 products
    }, [products]);


    
  return (
    <div>
        
        <div className='grid grid-row-3  p-10 gap-10 grid-cols-3 gap-4'>
            {
                latestProducts.map((item,index) => (
                    <Card key={index} name={item.name} image={item.image1} id={item._id} price={item.price} />
                ))
            }
        </div>
    </div>
  )
}

export default LatestCollection