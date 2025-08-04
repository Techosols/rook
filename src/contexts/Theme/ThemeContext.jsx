import { createContext } from "react"

const ThemeContext = createContext({
    theme: 'light', // Default theme
    toggleTheme: () => {}, // Function to toggle theme
    setTheme: () => {} // Function to set a specific theme
})


export default ThemeContext