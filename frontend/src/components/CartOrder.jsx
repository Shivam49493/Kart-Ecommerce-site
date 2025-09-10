import React from 'react'
import {shopDataContext} from '../context/ShopContext'



function CartOrder() {
    let {cartItems,currency,deliveryCharge,getCartAmount,getCartCount}=React.useContext(shopDataContext);
     
    let cartData=structuredClone(cartItems);
    console.log(cartData);
    let totalPrice=getCartAmount();
    let totalItems=getCartCount();
    
  return (
    <div>
        <div>
            <h2>Orders</h2>
            <div>
              
                {totalItems>0 && <div style={{border:'1px solid black',margin:'10px',padding:'10px'}}>
                    <p>Total item:{totalItems}</p>
                    <p>Delivery Charge: {deliveryCharge} {currency}</p>
                    <p>Total Price: {totalPrice + deliveryCharge} {currency}</p>
                </div>}
            </div>




        </div>
    </div>
  )
}

export default CartOrder