import React, { createContext, useContext, useEffect } from 'react'

const ThemeContext = createContext()

const ThemeProvider = ({ children }) => {

    const defaultThemes = {
        darkTheme: "dark",
        lightTheme: "light",
    }

    const toggleTheme = () => {
        const oldTheme = localStorage.getItem("theme")
        const newTheme = oldTheme === defaultThemes.darkTheme ? defaultThemes.lightTheme : defaultThemes.darkTheme
        document.documentElement.classList.remove(oldTheme)
        document.documentElement.classList.add(newTheme)
        localStorage.setItem("theme", newTheme)
    }

    useEffect(() => {
        const theme = localStorage.getItem("theme")
        if (!theme) document.documentElement.classList.add(defaultThemes.lightTheme)
        else document.documentElement.classList.add(theme)
    }, [])

    return (
        <ThemeContext.Provider value={{ toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    )
}
export const useGlobalTheme = () => {
    return useContext(ThemeContext)
}
export default ThemeProvider
