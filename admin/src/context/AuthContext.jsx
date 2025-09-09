import React from 'react'
import { createContext } from 'react'

export const authDataContext = createContext();

function AuthContext({children}) {
    let serverUrl = "http://localhost:8000"
    let values = {
        serverUrl
    }
  return (
    <authDataContext.Provider value={values}>
      {children}
    </authDataContext.Provider>
  )
}

export default AuthContext