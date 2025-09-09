import { createContext,useContext,useEffect,useState } from "react";
import {authDataContext} from "./AuthContext";
import React from "react";
export const userDataContext = createContext();
import axios from "axios";
function UserContext({ children }) {
    let [userData, setUserData] = useState("");
    let {serverUrl} = useContext(authDataContext);
    
    const getCurrentUser = async () => {
        try {
            const response = await axios.get(`${serverUrl}/api/user/getcurrentuser`, {
                withCredentials: true,
            });
            console.log("Current user data:", response.data);
            if (response.status !== 200) {
                setUserData(null);
                throw new Error("Failed to fetch current user");
            }
            setUserData(response.data);
        } catch (error) {
            console.error("Error fetching current user:", error);
        }

    }
    useEffect(() => {
        getCurrentUser();
    }, []);
    let value = { userData, setUserData, serverUrl ,getCurrentUser};
    
    return ( 
        <div>
            <userDataContext.Provider value={value}>
                {children}
            </userDataContext.Provider>
        </div>
    );
}
export default UserContext;