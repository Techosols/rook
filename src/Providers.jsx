import React from 'react'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import ThemeProvider from './contexts/Theme/ThemeProvider'
import TabProvider from './contexts/Tab/TabProvider'

const queryClient = new QueryClient()
const Providers = ({ children }) => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <TabProvider>
        {children}
      </TabProvider>
    </ThemeProvider>
  </QueryClientProvider>
)

export default Providers;