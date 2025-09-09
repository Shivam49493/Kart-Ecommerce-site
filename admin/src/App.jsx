import {useContext} from 'react'
import Login from './pages/Login'
import Add from './pages/Add'
import Orders from './pages/Orders'

import Lists from './pages/Lists'

import {Routes, Route } from 'react-router'
import Home from './pages/Home'
import { adminDataContext } from './context/AdminContext'


function App() {
  let {adminData} = useContext(adminDataContext);
 

  return (

    <>{!adminData ? <Login /> :
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/add" element={<Add />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/lists" element={<Lists />} />
      </Routes>
    }</>
  )
}

export default App
