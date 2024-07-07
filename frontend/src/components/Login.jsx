import React, { useState, useEffect } from 'react'
import config from '../config/config'
import { useNavigate } from 'react-router-dom'

const Login = ({ setIsAuthenticated }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const navigate = useNavigate()

  useEffect(() => {
    let jwt = localStorage.getItem('jwt')
    if (jwt) {
      setIsAuthenticated(true)
      navigate('/home')
    }
    else {
      setIsAuthenticated(false)
    }
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const response = await fetch(`${config.hostUrl}/api/auth`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email,
          password
        })
      })

      if (!response.ok) throw new Error(await response.text())

      const data = await response.json()
      const jwt = response.headers.get('x-auth-token')

      localStorage.setItem("_id", data._id)
      localStorage.setItem("jwt", jwt)

      setIsAuthenticated(true)
      navigate('/home')

    } catch (error) {
      alert(error)
    }
  }

  return (
    <div className="bg-[url('/bg/bg1.jpg')] bg-cover relative w-full h-full">
      <div className='absolute inset-0 bg-black bg-opacity-50'></div>
      <div className='relative z-10 flex flex-col w-full h-full'>
        <div className='w-full h-[17%]'>
          <img className='w-40 h-12 mt-7 ml-40' src='/logo/logo1.jpg' alt="" />

        </div>
        <div className='w-full h-full flex justify-center relative'>
          <div className='w-[30%] absolute bottom-0 h-full bg-black bg-opacity-75 rounded-lg flex flex-col px-16 pt-10'>
            <h1 className='text-white text-3xl font-semibold mb-7'>Sign in</h1>
            <form onSubmit={handleSubmit} className='flex flex-col'>
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder='Email'
                className='bg-black bg-opacity-60 h-14 px-6 border border-1 border-gray-600
              rounded-lg mb-6 focus:outline-none focus:ring-1 focus:ring-red-700 
              focus:border-red-800 text-white'
              />

              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder='Password'
                className='bg-black bg-opacity-60 h-14 px-6 border border-1 border-gray-600
              rounded-lg mb-6 focus:outline-none focus:ring-1 focus:ring-red-700 
              focus:border-red-800 text-white'
              />

              <button
                type='submit'
                className='bg-red-700 rounded-md text-white text-lg h-12 mb-10 active:scale-95'
              >Sign In</button>
            </form>
            <div className='flex text-lg'>
              <p className='text-gray-400 mr-2'>Don't have an account? </p>
              <button
                onClick={() => navigate('/signup')}
                className='text-white hover:underline'
              >Sign up now</button>

            </div>
          </div>
        </div>
      </div>

    </div>
  )
}

export default Login
