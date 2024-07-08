import React, { useState, useEffect } from 'react'
import config from '../config/config'
import Spinner from './Spinner';

const Myinfo = () => {
    const [info, setInfo] = useState(null);

    async function getInfo() {
        const jwt = localStorage.getItem('jwt');
        try {
            const response = await fetch(`${config.hostUrl}/api/users/me`, {
                method: "GET",
                headers: {
                    'x-auth-token': jwt
                }
            });
            if (!response.ok) throw new Error('Cannot fetch information');

            const data = await response.json();
            setInfo(data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getInfo();
    }, []);

    return (
        <div className='bg-[#313131] min-h-screen h-auto w-full'>
            {info ? (
                <div className='flex justify-center items-center h-full'>
                    <div className='bg-[#212121] w-full max-w-[600px] p-8 rounded-lg'>
                        <h1 className='text-white text-3xl font-semibold mb-6 text-center'>Your Information</h1>
                        <div className='text-white text-xl mb-4'>
                            <p><span className='text-red-700'>Name:</span> {info.name}</p>
                            <p><span className='text-red-700'>Email:</span> {info.email}</p>
                            <p><span className='text-red-700'>isAdmin:</span> {info.isAdmin ? 'Yes' : 'No'}</p>
                        </div>
                    </div>
                </div>
            ) : (
                <div className='flex items-center justify-center h-full'>
                    <Spinner /> {/* Display spinner component while loading */}
                </div>
            )}
        </div>
    );
}

export default Myinfo;
