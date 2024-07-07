import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

const Card1 = ({title, url, year, genre, starRating}) => {
  const yellowStars = parseInt(starRating / 2)
  const whiteStars = 5 - yellowStars
  const stars = []
  for(let i=0; i<yellowStars; i++){
    stars.push(<FontAwesomeIcon key={i} icon={faStar} style={{ color: 'yellow' }} />)
  }
  for(let i=0; i<whiteStars; i++){
    stars.push(<FontAwesomeIcon key={i} icon={faStar} style={{ color: 'white' }} />)
  }
  return (
    <div className='flex w-full px-5 my-5 h-[150px]'>
      <img className='w-[110px] rounded-3xl' src={url} alt="" />
      <div className='flex flex-col w-full px-5'>
        <div className='flex justify-start items-center w-full h-[50px]'>
          <h1 className='text-lg'>{title}</h1>
        </div>
        <div className='h-[40px]'>
          <p>{year} &#x2022; {genre.name}</p>
        </div>
        <div className='mt-3'>
            <p>{starRating} {stars}</p>
        </div>

      </div>
    </div>
  )
}

export default Card1
