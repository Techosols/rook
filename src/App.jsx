import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import Providers from './Providers'

import Layout from './pages/Layout'
import Home from './pages/Home'
import ContactUs from './pages/ContactUs'
import FAQ from './pages/FAQ'
import NotFound from './pages/NotFound'

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

          <Route path='*' element={<NotFound />} />
        </Routes>
        <ToastContainer />
      </BrowserRouter>
    </Providers>
  )
}

export default App