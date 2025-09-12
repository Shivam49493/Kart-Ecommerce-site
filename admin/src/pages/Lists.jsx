import React, { useContext, useState, useEffect } from 'react'
import Sidebar from '../components/Sidebar'
import Nav from '../components/Nav'
import { authDataContext } from '../context/AuthContext'
import axios from 'axios'

function Lists() {
  const [list, setList] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [deleteLoading, setDeleteLoading] = useState(null)
  let { serverUrl } = useContext(authDataContext)

  const fetchData = async () => {
    try {
      setLoading(true)
      setError(null)
      let result = await axios.get(serverUrl + '/api/products/list', { 
        withCredentials: true 
      })
      setList(result.data)
    } catch (err) {
      setError(err.message || "Something went wrong")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  const deleteItem = async (id) => {
    try {
      setDeleteLoading(id)
      let result = await axios.delete(`${serverUrl}/api/products/delete/${id}`, { 
        withCredentials: true 
      })
      if (result.status === 200) {
        fetchData()
      } else {
        console.log("Failed to delete product")
      }
    } catch (err) {
      console.log("Error deleting product:", err)
    } finally {
      setDeleteLoading(null)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Nav />
        <Sidebar />
        <div className="ml-64 mt-16 p-6">
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
            <span className="ml-3 text-gray-600">Loading products...</span>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Nav />
        <Sidebar />
        <div className="ml-64 mt-16 p-6">
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            <strong>Error: </strong>{error}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Nav />
      <Sidebar />
      <div className='ml-64 mt-16 p-6'>
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Product List</h1>
          <p className="text-gray-600">Manage your products</p>
        </div>

        {list && list.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {list.map((item, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
                <div className="h-48 overflow-hidden">
                  <img 
                    src={item.image1} 
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <div className="p-4">
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">{item.name}</h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">{item.description}</p>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-green-600 font-bold">${item.price || 'N/A'}</span>
                    <button 
                      onClick={() => deleteItem(item._id)}
                      disabled={deleteLoading === item._id}
                      className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 
                               disabled:bg-red-300 disabled:cursor-not-allowed transition-colors duration-200"
                    >
                      {deleteLoading === item._id ? (
                        <span className="flex items-center">
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                          Deleting...
                        </span>
                      ) : (
                        'Delete'
                      )}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <div className="text-gray-400 text-6xl mb-4">📦</div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">No products available</h3>
            <p className="text-gray-500">Get started by adding your first product.</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default Lists