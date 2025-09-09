import React from 'react'
import Nav from '../components/Nav'
import Sidebar from '../components/Sidebar'

function Home() {
  return (
    <div>
      <Nav />
      <div className='bg-black '><input type="checkbox" value="synthwave" className="toggle theme-controller" /></div>

      
      <Sidebar/>
      <input
  type="checkbox"
  value="synthwave"
  className="toggle theme-controller col-span-2 col-start-1 row-start-1 border-sky-400 bg-amber-300 [--tglbg:var(--color-sky-500)] checked:border-blue-800 checked:bg-blue-300 checked:[--tglbg:var(--color-blue-900)]" />
      <div>
        <h1>Welcome to the Home Page</h1>
      

      </div>
    </div>
  )
}

export default Home