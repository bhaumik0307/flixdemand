import React, { useState } from 'react'
import logo from '/logo/logo1.jpg'
import { NavLink } from 'react-router-dom'
import { CiSearch } from "react-icons/ci";
import { FaBars } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom'

const Navbar = ({ setIsAuthenticated }) => {
  const navigate = useNavigate()

  const [open, setOpen] = useState(false)

  const handleLogout = () => {
    localStorage.removeItem('_id')
    localStorage.removeItem('jwt')
    setIsAuthenticated(false)
    navigate('/')
  }

  const toggleOpen = () => {
    setOpen(!open)
  }


  return (
    <div className='bg-[#111111] text-white flex flex-col md:flex-row pt-8 pb-6 px-8 w-full'>
      <div className='flex justify-between mb-4 md:mb-0'>
        <img src={logo} className='w-[150px] rounded-xl mr-10' alt="img" />
        <button onClick={toggleOpen} className='md:hidden'>
          <FaBars />
        </button>
        </div>
        <div className={`${open? 'block' : 'hidden'} md:block md:flex w-full`}>
        <div className='flex flex-col md:flex-row justify-center items-center w-full md:w-[60%]'>
          <NavLink
            className={({ isActive }) => `${isActive ? 'bg-white text-black' : 'bg-gray-800 text-white'} 
        flex justify-center items-center rounded-full text-lg font-semibold px-3 mr-8 mb-4 md:mb-0 
        w-[130px] h-[45px] hover:bg-white hover:text-black active:scale-95` }
            to='/home'
          >
            Home
          </NavLink>

          <NavLink
            className={({ isActive }) => `${isActive ? 'bg-white text-black' : 'bg-gray-800 text-white'} 
        flex justify-center items-center rounded-full text-lg font-semibold px-3 mr-8 mb-4 md:mb-0
        w-[130px] h-[45px] hover:bg-white hover:text-black active:scale-95` }
            to='/myrentals'
          >
            My Rentals
          </NavLink>

          <NavLink
            className={({ isActive }) => `${isActive ? 'bg-white text-black' : 'bg-gray-800 text-white'} 
        flex justify-center items-center rounded-full text-lg font-semibold px-3 mr-8 mb-4 md:mb-0
        w-[130px] h-[45px] hover:bg-white hover:text-black active:scale-95` }
            to='/me'
          >
            MyAccount
          </NavLink>

        </div>

        <div className='flex flex-col md:flex-row justify-between md:w-[38%] w-full px-4'>

          <div className='flex justify-center items-center bg-[#313131]  rounded-full focus:shadow-lg px-3 focus-within:shadow-gray-700 focus-within:shadow-xl mb-4 md:mb-0' >
            <CiSearch color='white' size="25px" />
            <input type="text" className='bg-[#313131] transition-all duration-300 ease-in-out transform w-56 focus:w-64 px-4 py-2 outline-none' placeholder='Search' />
          </div>

          <div className=' flex justify-center'>

            <button
              className='rounded-full text-lg font-semibold px-3 
        w-[130px] h-[45px] active:scale-95 bg-white text-black'
              onClick={handleLogout}
            >Log Out</button>

          </div>
        </div>
        </div>
      </div>
  )
}

export default Navbar
