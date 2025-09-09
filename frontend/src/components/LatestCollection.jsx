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
        <div>
            <Title text1={'Latest '} text2={'Collection'}/>
        </div>
        <div>
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