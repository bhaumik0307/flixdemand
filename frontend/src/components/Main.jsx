import React from 'react'
import { Navbar, Footer, Spinner } from '../components'
import { Outlet } from 'react-router-dom'

const Main = ({ setIsAuthenticated }) => {
  return (
    <div className='w-full h-full'>
      <Navbar setIsAuthenticated={setIsAuthenticated} />
      <hr className='h-[1px] bg-[#313131] border-none'></hr>
      <Outlet />
      <Footer />
    </div>
  )
}

export default Main
