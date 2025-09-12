import React, { useContext } from 'react'
import { useNavigate } from 'react-router';
import { authDataContext } from '../context/AuthContext.jsx';
import { adminDataContext } from '../context/AdminContext';
import axios from 'axios';

function Nav() {
    let navigate = useNavigate();
    let { serverurl } = useContext(authDataContext);
    let { getAdmin } = useContext(adminDataContext);

    const logout = async () => {
        try {
            let response = await axios.get(`${serverurl}/api/auth/logout`, {
                withCredentials: true
            });
            getAdmin();
            if (response.status === 200) {
                navigate('/login');
            } else {
                console.error('Logout failed');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }

    return (
       <div className='h-16 bg-green-600 fixed top-0 left-0 right-0 z-50 shadow-md'>
        <div className='container mx-auto px-6 h-full flex items-center justify-between'>
            {/* Logo/Brand */}
            <div 
                className='flex items-center gap-4 cursor-pointer group'
                onClick={() => navigate('/')}
            >
                <span className='text-white text-2xl font-bold tracking-wide group-hover:text-green-100 transition-colors duration-200'>
                    Kart
                </span>
            </div>

            {/* Logout Button */}
            <button 
                className='bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 
                         focus:outline-none focus:ring-2 focus:ring-red-300 focus:ring-opacity-50
                         transition-all duration-200 active:bg-red-700 shadow-sm'
                onClick={logout}
            >
                Logout
            </button>
        </div>
       </div>
    );
}

export default Nav