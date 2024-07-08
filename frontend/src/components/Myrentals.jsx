import React, { useEffect, useState } from 'react'
import Spinner from './Spinner';
import config from '../config/config'

const Myrentals = () => {
    const [rentals, setRentals] = useState(null)

    async function getRentals() {
        const userId = localStorage.getItem('_id')
        const jwt = localStorage.getItem('jwt')
        try {
            const response = await fetch(`${config.hostUrl}/api/rentals?userId=${userId}`, {
                methos: "GET",
                headers: {
                    'x-auth-token': jwt
                  }
            })
            if(!response.ok) throw new Error('cannot fetch rentals')

            const data = await response.json()
            setRentals(data)
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        getRentals()
    } ,[])
  return (
    <>
      {rentals?<>
        <div className='bg-[#313131] flex flex-col min-h-screen h-auto w-full'>
            {rentals.length===0?<div className='text-4xl h-full w-full text-white text-center font-semibold'>No rentals yet</div>:
            (rentals.map(({movie, dateOut}) => (
                <div key={movie._id} className='flex flex-col md:flex-row m-10 bg-[#212121] p-5' >
                    <img className='md:w-40 w-full rounded-xl' src={movie.url} alt="" />
                    <div className='md:mx-10 my-2 font-mono flex flex-col justify-start md:justify-between'>
                        <p className='text-white text-xl'><span className='text-red-700'>Title: </span>{movie.title}</p>
                        <p className='text-white text-xl'><span className='text-red-700'>Date Of Purchase:</span> {new Date(dateOut).toUTCString()}</p>
                    </div>
                </div>
            )))}
        </div>
      </> : <div className='w-full h-full flex justify-center items-center bg-[#313131]'><Spinner /></div>}
    </>
  )
}

export default Myrentals
