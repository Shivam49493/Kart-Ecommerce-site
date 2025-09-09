import React from 'react'
import {useState,useContext,createContext,useEffect} from 'react';
import { authDataContext } from './AuthContext';
import axios from 'axios';


export const adminDataContext = createContext();





function AdminContext({children}) {
    let [adminData,setAdminData] = useState(null);
    let {serverurl} = useContext(authDataContext);
     
    const getAdmin=async()=>{
        try{
            let result = await axios.get(`${serverurl}/admin`,{withCredentials:true});

         setAdminData(result.data);
        }
        catch(error){
            console.log(error);
        }
    }
    useEffect(() => {
        getAdmin();
    }, []);

    let value={ adminData, setAdminData ,getAdmin}
  return (
    <div>
        <adminDataContext.Provider value={value}>
            {children}
        </adminDataContext.Provider>
    </div>
  )
}

export default AdminContext