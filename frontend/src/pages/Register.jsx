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
  const [isLoading, setIsLoading] = useState(false);
    const [googleLoading, setGoogleLoading] = useState(false);

  let handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
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
    setGoogleLoading(true);
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
     <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden w-full max-w-md">
        <div className="p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Create Account</h1>
            <p className="text-gray-600">Sign up to get started with our service</p>
          </div>
          
          <button 
            className={`w-full flex items-center justify-center gap-3 py-3 px-4 rounded-lg border border-gray-200 transition-all mb-6 ${googleLoading ? 'opacity-75 cursor-not-allowed' : 'hover:shadow-md hover:border-gray-300'}`}
            onClick={handleGoogleSignIn}
            disabled={googleLoading}
          >
            {googleLoading ? (
              <div className="h-5 w-5 border-t-2 border-blue-500 border-solid rounded-full animate-spin"></div>
            ) : (
              <>
                <svg aria-label="Google logo" width="20" height="20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                  <g>
                    <path d="m0 0H512V512H0" fill="#fff"></path>
                    <path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"></path>
                    <path fill="#4285f4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"></path>
                    <path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"></path>
                    <path fill="#ea4335" d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"></path>
                  </g>
                </svg>
                <span className="text-gray-700 font-medium">Sign up with Google</span>
              </>
            )}
          </button>
          
          <div className="relative flex items-center mb-6">
            <div className="flex-grow border-t border-gray-200"></div>
            <span className="flex-shrink mx-4 text-gray-500">or with email</span>
            <div className="flex-grow border-t border-gray-200"></div>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
              <input 
                type="text" 
                id="name"
                placeholder="Enter your name" 
                onChange={(e) => setName(e.target.value)} 
                value={name}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                required
              />
            </div>
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
              <input 
                type="email" 
                id="email"
                placeholder="Enter your email" 
                onChange={(e) => setEmail(e.target.value)} 
                value={email}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                required
              />
            </div>
            
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <div className="relative">
                <input 
                  type={show ? "text" : "password"} 
                  id="password"
                  placeholder="Create a password" 
                  onChange={(e) => setPassword(e.target.value)} 
                  value={password}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition pr-12"
                  required
                />
                <button 
                  type="button" 
                  onClick={() => setShow(!show)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {show ? <IoEyeOutline size={20} /> : <IoEyeOutline size={20} />}
                </button>
              </div>
            </div>
            
            <button 
              type="submit" 
              className={`w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition flex items-center justify-center ${isLoading ? 'opacity-75 cursor-not-allowed' : ''}`}
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <div className="h-5 w-5 border-t-2 border-white border-solid rounded-full animate-spin mr-2"></div>
                  Creating Account...
                </>
              ) : (
                'Create Account'
              )}
            </button>
            
            <div className="text-center pt-4">
              <p className="text-gray-600">
                Already have an account? 
                <span 
                  onClick={() => navigate('/login')} 
                  className="text-blue-600 font-medium hover:text-blue-800 cursor-pointer ml-1 transition"
                >
                  Login
                </span>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>   
  )
}

export default Register