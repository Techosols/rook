import React, { useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router'
import { ToastContainer } from 'react-toastify'
import Model from './components/Model'
import 'react-toastify/dist/ReactToastify.css'

import Providers from './Providers'

import Layout from './pages/Layout'
import Home from './pages/Home'
import ContactUs from './pages/ContactUs'
import FAQ from './pages/FAQ'
import NotFound from './pages/NotFound'

import useModel from './hooks/useModel'

function App() {

  const { model, openModel, closeModel } = useModel();

  // Handle No Internet Connection globally
  useEffect(() => {
    function handleOffline() {
      if (!window?.navigator?.onLine) {
        openModel({ for: 'noInternet', heading: 'No Internet', dissmissible: false });
      }
    }

    function handleOnline() {
      // If you want to close the modal when internet returns, add your close logic here
      // closeModel(); // If you have a closeModel function
      closeModel();
      window.location.reload();
    }

    window.addEventListener('offline', handleOffline);
    window.addEventListener('online', handleOnline);

    return () => {
      window.removeEventListener('offline', handleOffline);
      window.removeEventListener('online', handleOnline);
    };
  }, [openModel]);

  return (
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
      {model && <Model />}
    </BrowserRouter>
  )
}

export default App