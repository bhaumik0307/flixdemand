import React, { useEffect, useState } from 'react'

const Myrentals = () => {
    const [rentals, setRentals] = useState(null)

    async function getRentals() {
        const userId = localStorage.getItem('_id')
        const jwt = localStorage.getItem('jwt')
        try {
            const response = await fetch(`http://localhost:3000/api/rentals?userId=${userId}`, {
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
                <div key={movie._id} className='flex m-10 bg-[#212121] p-5' >
                    <img className='w-40 rounded-xl' src={movie.url} alt="" />
                    <div className='mx-10 my-2 font-mono flex flex-col justify-between'>
                        <p className='text-white text-xl'><span className='text-red-700'>Title: </span>{movie.title}</p>
                        <p className='text-white text-xl'><span className='text-red-700'>Date Of Purchase:</span> {new Date(dateOut).toUTCString()}</p>
                    </div>
                </div>
            )))}
        </div>
      </> : <div>Loading...</div>}
    </>
  )
}

export default Myrentals
