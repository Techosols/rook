import React from 'react'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import AuthProvider from './contexts/Auth/AuthProvider'
import ThemeProvider from './contexts/Theme/ThemeProvider'
import TabProvider from './contexts/Tab/TabProvider'

const queryClient = new QueryClient()
const Providers = ({ children }) => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <ThemeProvider>
        <TabProvider>
          {children}
        </TabProvider>
      </ThemeProvider>
    </AuthProvider>
  </QueryClientProvider>
)

export default Providers;