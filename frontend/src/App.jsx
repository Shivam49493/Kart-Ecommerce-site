import React from 'react'
import { Routes,Route } from 'react-router'
import Register from './pages/Register.jsx'
import Login from './pages/Login.jsx'
import Home from './pages/Home.jsx'
import Nav from './components/Nav.jsx'
import {useContext } from 'react'
import { userDataContext } from './context/UserContext.jsx'
import { Navigate } from 'react-router'
import About from './pages/About.jsx'
import Cart from './pages/Cart.jsx'
import Contact from './pages/Contact.jsx'
import Collection from './pages/Collection.jsx'
import Product from './pages/Product.jsx'
import { useLocation } from 'react-router-dom'
import ProductDetail from './pages/ProductDetail.jsx'




function App() {
  let {userData} = useContext(userDataContext);
  let location = useLocation();


  return (
    <>
    {userData && <Nav />}
    <Routes>
      <Route path="/login" element={userData ? <Navigate to={location.state?.from || "/"} /> : <Login />} />
      <Route path="/" element={userData ? <Home /> : <Navigate to="/login" state={{ from: location.pathname }} />} />
      <Route path="/about" element={userData ? <About /> : <Navigate to="/login" state={{ from: location.pathname }} />} />
      <Route path="/contact" element={userData ? <Contact /> : <Navigate to="/login" state={{ from: location.pathname }} />} />
      <Route path="/collection" element={userData ? <Collection /> : <Navigate to="/login" state={{ from: location.pathname }} />} />
      <Route path="/product" element={userData ? <Product /> : <Navigate to="/login" state={{ from: location.pathname }} />} />
      <Route path="/productdetail/:id" element={userData ? <ProductDetail /> : <Navigate to="/login" state={{ from: location.pathname }} />} />
      <Route path="/register" element={<Register />} />
      <Route path="/cart" element={userData ? <Cart/> : <Navigate to="/login" state={{ from: location.pathname }} />} />
    </Routes>
    </>
  )
}

 
export default App