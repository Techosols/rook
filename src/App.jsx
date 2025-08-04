import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router'

import Providers from './Providers'
import Layout from './pages/Layout'

function App() {
  return (
    <Providers>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<div>Home</div>} />
            <Route path="about" element={<div>About</div>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Providers>
  )
}

export default App