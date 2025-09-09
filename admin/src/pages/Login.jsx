import React from 'react'
import {useNavigate} from 'react-router';
import {IoEyeOutline} from 'react-icons/io5';
import { useState } from 'react';
import { authDataContext } from '../context/AuthContext';
import { useContext } from 'react';
import { adminDataContext } from '../context/AdminContext';
import axios from 'axios';

function Login() {
  const navigate = useNavigate(); 
  let [show,setShow]= useState(false);
  let {serverUrl }=useContext(authDataContext);
  let [email,setEmail]=useState("");
  let [password,setPassword]=useState("");
  let {getAdmin} = useContext(adminDataContext);
  

  let handleSubmit = async (e) => {
    e.preventDefault();
    try{
      const response = await axios.post(serverUrl+'/api/auth/adminlogin', {
        email,
        password
      });
      if (response.status === 200) {
        getAdmin();
        navigate('/');
      }
    } catch (error) {
      console.error("Error logging in:", error);
    }
  }
  
  return (
    <div>
          <div>login</div>
          <div><input type="checkbox" value="synthwave" className="toggle theme-controller" /></div>
          
          <div>
            <form onSubmit={handleSubmit}>
    
              <input type="email" placeholder="Email"  onChange={(e) => setEmail(e.target.value)} value={email}/>
              <input type={show ? "text" : "password"} placeholder="Password" onChange={(e) => setPassword(e.target.value)} value={password}/>
              <button type="button" onClick={() => setShow(!show)}>
                <IoEyeOutline />
              </button>
              <button type="submit">login</button>
              
            </form>
          </div>
     </div> 
  )
}

export default Login