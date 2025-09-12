import React from 'react'
import {useNavigate} from 'react-router';
import {IoEyeOutline} from 'react-icons/io5';
import { useState } from 'react';
import { useContext } from 'react';
import { authDataContext } from '../context/AuthContext'; 
import axios from 'axios';
import { signInWithPopup } from 'firebase/auth';
import {auth,provider} from '../utils/firebase.js';
import { userDataContext } from '../context/UserContext.jsx'; 

const Register = () => {
  const navigate = useNavigate(); 
  let [show,setShow]= useState(false);
  let {serverUrl }=useContext(authDataContext);
  let [name,setName]=useState("");
  let [email,setEmail]=useState("");
  let [password,setPassword]=useState("");
  let {getCurrentUser }=useContext(userDataContext);

  let handleSubmit = async (e) => {
    e.preventDefault();
    try{
      const response = await axios.post(serverUrl + '/api/auth/register', {
        name,
        email,
        password
      }, { withCredentials: true });

      if (response.status === 201) {
        getCurrentUser();
        navigate('/about');
      }
    } catch (error) {
      console.error("Error registering:", error);
    }

  }
  const handleGoogleSignIn = async () => {
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
        navigate('/');
      }

    } catch (error) {
      console.error("Error signing in with Google:", error);
    }
  };

  return (
    <div>
      <div>Register</div>
          <button className="btn bg-white text-black border-[#e5e5e5]" onClick={handleGoogleSignIn}>
            <svg aria-label="Google logo" width="16" height="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><g><path d="m0 0H512V512H0" fill="#fff"></path><path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"></path><path fill="#4285f4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"></path><path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"></path><path fill="#ea4335" d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"></path></g></svg>
            Login with Google
          </button>
     
      <div>
        <form onSubmit={handleSubmit}>
          <input type="text" placeholder="Username" onChange={(e) => setName(e.target.value)} value={name}/>
          <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} value={email}/>
          <input type={show ? "text" : "password"} placeholder="Password" onChange={(e) => setPassword(e.target.value)} value={password}/>
          <button type="button" onClick={() => setShow(!show)}>
            <IoEyeOutline />
          </button>
          <button type="submit">Register</button>
          <p>Already have an account?<span onClick={() =>navigate('/login')}>Login</span></p>
        </form>
      </div>
    </div>  
  )
}

export default Register