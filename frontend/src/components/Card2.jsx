import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

const Card2 = ({movieId, rating, year, title, url}) => {
    return (
        <div className='w-[192px] h-[240px] mb-10 mr-8 rounded-3xl overflow-hidden 
        flex flex-col relative transition-all shadow-xl hover:scale-110'>
            <img  className='w-full h-full' src={url} alt="" />
            <div className='flex absolute bottom-0 backdrop-blur-lg rounded-full 
            w-full justify-center items-center h-[20%]'>
            {/* backdrop-blur-lg */}
            <div className='w-[75%] flex flex-col justify-center items-left pl-5'>
                <p className='text-sm font-mono'>{title}</p>
                <p className='text-xs font-mono'>{year}</p>

            </div>

            {/* vertical line */}
            <div className='w-[1px] h-[30px] bg-gray-500 margin-[10px] rounded-full'></div>

            <div className='w-[25%] flex justify-center items-center space-x-1 pr-1'>
                <FontAwesomeIcon icon={faStar} className='fa-xs' style={{ color: 'white' }} />
                <p className='text-xs'>{rating}</p>
            </div>
            </div>
        </div>
    )
}

export default Card2
