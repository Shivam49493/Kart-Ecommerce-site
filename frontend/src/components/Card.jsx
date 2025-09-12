import React from 'react'
import { shopDataContext } from '../context/ShopContext'
import { useContext} from 'react';
import { useNavigate } from 'react-router';




function Card({name, image,id, price}) {
    let {currency} = useContext(shopDataContext);
    let navigate = useNavigate();
  return (
    <div>
        <div className='border p-4' onClick={()=>navigate(`/productdetail/${id}`)}>
            <img src={image} alt={name} className='h-48 m-auto'/>
            <p className='text-center'>{name}</p>
            <p className='text-center font-bold'>{currency} {price}</p>
        </div>
        <div className="card bg-base-100 w-96 shadow-sm">
          <figure>
    <img
      src={image} alt={name}  />
  </figure>
  <div className="card-body">
    <h2 className="card-title">{name}</h2>
    <h2><p className='text-center font-bold'>{currency} {price}</p> </h2>

    <p>A card component has a figure, a body part, and inside body there are title and actions parts</p>
    <div className="card-actions justify-end">
      <button className="btn btn-primary">Buy Now</button>
    </div>
  </div>
</div>
    </div>
  )
}

export default Card