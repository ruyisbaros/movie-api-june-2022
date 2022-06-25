import React, { createContext, useContext } from 'react'

const ThemeContext = createContext()

const ThemeProvider = ({ children }) => {
    return (
        <ThemeContext.Provider value={{ theme: "test theme222222" }}>
            {children}
        </ThemeContext.Provider>
    )
}
export const useGlobalTheme = () => {
    return useContext(ThemeContext)
}
export default ThemeProvider
