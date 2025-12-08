
import { Outlet } from "react-router-dom"

import Header from "../components/Header"
import Footer from "../components/Footer"

function Layout() {
  return (
    <div>
      <Header />
      <main  className="min-h-[calc(100vh-100px)] dark:bg-background-dark">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

export default Layout