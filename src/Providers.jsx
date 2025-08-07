import React from 'react'

import ThemeProvider from './contexts/Theme/ThemeProvider'
import TabProvider from './contexts/Tab/TabProvider'

function Providers({ children }) {
  return (
    <div>
        <ThemeProvider>
          <TabProvider>
            {children}
          </TabProvider>
        </ThemeProvider>
    </div>
  )
}

export default Providers;