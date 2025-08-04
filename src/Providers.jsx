import React from 'react'

import ThemeProvider from './contexts/Theme/ThemeProvider'

function Providers({ children }) {
  return (
    <div>
        <ThemeProvider>
            {children}
        </ThemeProvider>
    </div>
  )
}

export default Providers