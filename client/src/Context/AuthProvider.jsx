import React, { createContext, useContext, useEffect, useState } from 'react'

const AuthContext = createContext()

const initialAuthInfo = {
    currentUser: null,
    isLoggedIn: false,
    isPending: false,
    error: "",
    accessToken: null
}

const AuthProvider = ({ children }) => {

    const [authInfo, setAuthInfo] = useState({ ...initialAuthInfo })

    const handleLogin = () => { }

    const handleLogout = () => { }

    const isAuth = () => { }

    return (
        <AuthContext.Provider value={{ authInfo, setAuthInfo, handleLogin, handleLogout, isAuth }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useGlobalAuth = () => useContext(AuthContext)

export default AuthProvider