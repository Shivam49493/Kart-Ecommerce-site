import React from 'react'
import {useNavigate} from 'react-router';
import {IoEyeOutline} from 'react-icons/io5';
import { useState } from 'react';
import { authDataContext } from '../context/AuthContext';
import { useContext } from 'react';
import axios from 'axios';
import { signInWithPopup } from 'firebase/auth';
import {auth,provider} from '../utils/firebase.js';

const Login = () => {
  const navigate = useNavigate(); 
  let [show,setShow]= useState(false);
  let {serverUrl }=useContext(authDataContext);
  let [email,setEmail]=useState("");
  let [password,setPassword]=useState("");

  let handleSubmit = async (e) => {
    e.preventDefault();
    try{
      const response = await axios.post(serverUrl+'/api/auth/login', {
        email,
        password
      });
      if (response.status === 200) {
        navigate('/');
      }
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };
  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      let user = result.user;
      let email = user.email;
      let name = user.displayName;
      const response = await axios.post(`${serverUrl}/api/auth/googlelogin`, {
       
        name,
        email
      }, { withCredentials: true });

      if (response.status === 200) {
        navigate('/about');
      }

    } catch (error) {
      console.error("Error signing in with Google:", error);
    }
  };

  return (
    <div>
      <div>login</div>
      <div onClick={handleGoogleLogin}>login with google</div>
      <div>
        <form onSubmit={handleSubmit}>

          <input type="email" placeholder="Email"  onChange={(e) => setEmail(e.target.value)} value={email}/>
          <input type={show ? "text" : "password"} placeholder="Password" onChange={(e) => setPassword(e.target.value)} value={password}/>
          <button type="button" onClick={() => setShow(!show)}>
            <IoEyeOutline />
          </button>
          <button type="submit">login</button>
          <p>Don't have an account?<span onClick={() =>navigate('/register')}>Register</span></p>
        </form>
      </div>
    </div>  
  )
}

export default Login