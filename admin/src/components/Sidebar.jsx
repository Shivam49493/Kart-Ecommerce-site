import React from 'react'
import { useNavigate } from 'react-router-dom'

function Sidebar() {
  let navigate = useNavigate();

  const menuItems = [
    { label: 'Orders', path: '/orders' },
    { label: 'Add Item', path: '/add' },
    { label: 'List Items', path: '/lists' }
  ]

  return (
    <div className='w-64 bg-gray-800 text-white p-6 fixed left-0 top-0 h-full shadow-lg'>
      <div className='mb-8'>
        <h1 className='text-2xl font-bold text-center'>Admin Panel</h1>
      </div>
      
      <nav>
        <ul className='space-y-2'>
          {menuItems.map((item, index) => (
            <li key={index}>
              <button
                onClick={() => navigate(item.path)}
                className='w-full text-left px-4 py-3 rounded-lg transition-all duration-200 
                         hover:bg-gray-700 hover:text-blue-300 focus:outline-none focus:ring-2 
                         focus:ring-blue-500 focus:bg-gray-700 active:bg-gray-600
                         flex items-center space-x-3'
              >
                <span className='text-lg'>{item.label}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>
      
      {/* Optional: Add user info section if you have adminData */}
      {/* {adminData && (
        <div className='absolute bottom-6 left-6 right-6'>
          <div className='border-t border-gray-600 pt-4'>
            <p className='text-sm text-gray-400'>Logged in as:</p>
            <p className='font-medium'>{adminData.name}</p>
          </div>
        </div>
      )} */}
    </div>
  )
}

export default Sidebar