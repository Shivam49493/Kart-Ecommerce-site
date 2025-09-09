import React from 'react'
import Sidebar from '../components/Sidebar'
import Nav from '../components/Nav'
import axios from 'axios'

import { useState, useEffect } from 'react'

function Lists() {
  const [list, setList] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  

  const fetchData = async () => {
    try {
      setLoading(true)
      setError(null)
      let result = await axios.get(`http://localhost:8000/api/products/list`, { withCredentials: true })
      setList(result.data)

      // Handle different response structures
    
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
      let result = await axios.post(`http://localhost:8000/api/products/delete/${id}`, {}, { withCredentials: true })
      if (result.status === 200) {
        fetchData()
      } else {
        console.log("Failed to delete product")
      }
    } catch (err) {
      console.log("Error deleting product:", err)
    }
  }

  if (loading) {
    return (
      <div>
        <Nav />
        <div>
          <Sidebar />
        </div>
        <div>Loading products...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div>
        <Nav />
        <div>
          <Sidebar />
        </div>
        <div>Error: {error}</div>
      </div>
    )
  }

  return (
    <div>
      <Nav />
      <div>
        <Sidebar />
      </div>
      <div className='ml-[200px] mt-[70px] p-4 '>
        {list && list.length > 0 ? (
          <div>
            {list.map((item, index) => (
              <div key={index}>
                <h3>{item.name}</h3>
                <p>{item.description}</p>
                <button onClick={() => deleteItem(item._id)}>Delete</button>
              </div>
            ))}
          </div>
        ) : (
          <p>No products available</p>
        )}
      </div>
    </div>
  )
}

export default Lists