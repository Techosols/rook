import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router'

import Providers from './Providers'

import Layout from './pages/Layout'
import Home from './pages/Home'
import ContactUs from './pages/ContactUs'
import FAQ from './pages/FAQ'

function App() {
  return (
    <Providers>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="contact" element={<ContactUs />} />
            <Route path="faq" element={<FAQ />} />
            
          </Route>
        </Routes>
      </BrowserRouter>
    </Providers>
  )
}

export default App