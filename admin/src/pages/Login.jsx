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
  const [isLoading, setIsLoading] = useState(false);
  

  let handleSubmit = async (e) => {
    setIsLoading(true);
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
          
       <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
                <div className="bg-white rounded-2xl shadow-xl overflow-hidden w-full max-w-md">
                  <div className="p-8">
                    <div className="text-center mb-8">
                      <h1 className="text-3xl font-bold text-gray-800 mb-2">Admin Login</h1>
                     
                    </div>
                    
                    
                    
                    
                    
                    <form onSubmit={handleSubmit} className="space-y-5">
                      
                      
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
                            placeholder="Enter password" 
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
                            Logging in...
                          </>
                        ) : (
                          'Login'
                        )}
                      </button>
                      
                      <div className="text-center pt-4">
                        <p className="text-gray-600">
                          Do not have an account? 
                          <span 
                            onClick={() => navigate('/register')} 
                            className="text-blue-600 font-medium hover:text-blue-800 cursor-pointer ml-1 transition"
                          >
                            Register
                          </span>
                        </p>
                      </div>
                    </form>
                  </div>
                </div>
              </div>    
          </div>
      
  )
}

export default Login