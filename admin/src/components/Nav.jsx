import React, {useContext}from 'react'
import { useNavigate } from 'react-router';
import { authDataContext } from '../context/AuthContext.jsx';
import { adminDataContext } from '../context/AdminContext';

import axios from 'axios';
function Nav() {
    let navigate = useNavigate();
    let {serverurl } =useContext(authDataContext);
    let {getAdmin} = useContext(adminDataContext);


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
       <div className='h-[70px] bg-[green] fixed top-0 left-0 right-0 z-10 shadow-black'>
        <div className='w-[200px] flex-items-center justify-start gap-4 cursor-pointer ' onClick={() => navigate('/')}>
            <input
  type="checkbox"
  value="synthwave"
  className="toggle theme-controller col-span-2 col-start-1 row-start-1 border-sky-400 bg-amber-300 [--tglbg:var(--color-sky-500)] checked:border-blue-800 checked:bg-blue-300 checked:[--tglbg:var(--color-blue-900)]" />
            Kart

            <button className='bg-red-500 text-white p-2 rounded hover:bg-red-600' onClick={logout}>Logout</button>
        </div>
       </div>
    );
}

export default Nav