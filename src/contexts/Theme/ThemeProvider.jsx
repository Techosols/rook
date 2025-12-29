import { useState, useEffect } from 'react'
import ThemeContext from './ThemeContext'

function getPreferredTheme() {
  const stored = localStorage.getItem('theme');
  if (stored === 'dark' || stored === 'light') return stored;
  if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
    return 'dark';
  }
  return 'light';
}

function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(getPreferredTheme)


  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = () => {
      // Only update theme if user hasn't set a preference
      if (!localStorage.getItem('theme')) {
        setTheme(mediaQuery.matches ? 'dark' : 'light');
      }
    };
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // Add this effect to toggle the 'dark' class on <html>

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'))
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setTheme }}>
        {children}
    </ThemeContext.Provider>
  )
}

export default ThemeProvider