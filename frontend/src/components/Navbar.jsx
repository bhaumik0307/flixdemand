import React, { useState } from 'react'
import logo from '/logo/logo1.jpg'
import { NavLink } from 'react-router-dom'
import { CiSearch } from "react-icons/ci";
import { useNavigate } from 'react-router-dom'

const Navbar = ({ setIsAuthenticated }) => {
  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem('_id')
    localStorage.removeItem('jwt')
    setIsAuthenticated(false)
    navigate('/')
  }


  return (
    <div className='bg-[#111111] text-white flex flex-col md:flex-row pt-8 pb-6 px-8 w-full'>
      <img src={logo} className='w-[150px] rounded-xl mr-10' alt="img" />
        <div className='flex flex-col md:flex-row justify-center items-center w-[60%] space-x-8'>
          <NavLink
            className={({ isActive }) => `${isActive ? 'bg-white text-black' : 'bg-gray-800 text-white'} 
        flex justify-center items-center rounded-full text-lg font-semibold px-3 
        w-[130px] h-[45px] hover:bg-white hover:text-black active:scale-95` }
            to='/home'
          >
            Home
          </NavLink>

          <NavLink
            className={({ isActive }) => `${isActive ? 'bg-white text-black' : 'bg-gray-800 text-white'} 
        flex justify-center items-center rounded-full text-lg font-semibold px-3 
        w-[130px] h-[45px] hover:bg-white hover:text-black active:scale-95` }
            to='/myrentals'
          >
            My Rentals
          </NavLink>

          <NavLink
            className={({ isActive }) => `${isActive ? 'bg-white text-black' : 'bg-gray-800 text-white'} 
        flex justify-center items-center rounded-full text-lg font-semibold px-3 
        w-[130px] h-[45px] hover:bg-white hover:text-black active:scale-95` }
            to='/me'
          >
            MyAccount
          </NavLink>

        </div>

        <div className='flex flex-col md:flex-row justify-between w-[38%] px-4'>

          <div className='flex justify-center items-center bg-[#313131]  rounded-full focus:shadow-lg px-3 focus-within:shadow-gray-700 focus-within:shadow-xl' >
            <CiSearch color='white' size="25px" />
            <input type="text" className='bg-[#313131] transition-all duration-300 ease-in-out transform w-56 focus:w-64 px-4 py-2 outline-none' placeholder='Search' />
          </div>

          <div className=''>

            <button
              className='rounded-full text-lg font-semibold px-3 
        w-[130px] h-[45px] active:scale-95 bg-white text-black'
              onClick={handleLogout}
            >Log Out</button>

          </div>
        </div>
      </div>
  )
}

export default Navbar
