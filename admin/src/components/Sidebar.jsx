import React from 'react'
import { useNavigate } from 'react-router-dom'

function Sidebar() {
  //let {adminData} = useContext(adminDataContext);
  let navigate = useNavigate();

  

  return (
    <div className='w-[200px] bg-gray-100 p-4 fixed left-0 top-100 h-full'>
        <div >
            
           <ul>
            <li onClick={() => navigate('/orders')}>orders</li>
            <li onClick={() => navigate('/add')}>add item</li>
            <li onClick={() => navigate('/lists')}>list item</li>
           </ul>
            
        </div>
    </div>
  )
}

export default Sidebar