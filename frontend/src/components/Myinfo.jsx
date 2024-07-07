import React, { useState, useEffect } from 'react'

const Myinfo = () => {
    const [info, setInfo] = useState(null)
    async function getInfo() {
        const jwt = localStorage.getItem('jwt')
        try {
            const response = await fetch('https://flixdemand-1.onrender.com/api/users/me', {
                method: "GET",
                headers: {
                    'x-auth-token': jwt
                }
            })
            if (!response.ok) throw new Error('cannot fetch information')

            const data = await response.json()
            setInfo(data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getInfo()
    }, [])

    return (
        <div className='w-full h-[85%] bg-[#313131] h-full'>
            {info ? <div className='w-full h-full flex justify-center items-center'>
                <div className='font-mono flex flex-col justify-center bg-[#212121] w-[30%] h-full px-10 py-4'>
                    <h1 className='text-white text-3xl font-semibold text-center mb-10'>Your Information</h1>
                    <div>
                    <p className='text-white text-2xl mb-2'><span className='text-red-700'>Name: </span> {info.name} </p>
                    <p className='text-white text-2xl mb-2'><span className='text-red-700'>Email: </span> {info.email} </p>
                    <p className='text-white text-2xl mb-2'><span className='text-red-700'>isAdmin: </span> {info.isAdmin ? 'Yes' : 'No'} </p>
                    </div>

                </div>


            </div> : <div>Loading...</div>}
        </div>
    )
}

export default Myinfo
