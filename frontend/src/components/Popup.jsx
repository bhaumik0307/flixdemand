import React, { useEffect, useState } from 'react'
import { RxCross2 } from "react-icons/rx";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { BiCameraMovie } from "react-icons/bi";
import { SiTicktick } from "react-icons/si";
import config from '../config/config';
import Spinner from './Spinner';

const Popup = ({ movieId, setPopup }) => {
  const [movie, setMovie] = useState(null)
  const [rented, setRented] = useState(false)

  async function getMovie() {
    const jwt = localStorage.getItem('jwt')
    try {
      console.log(movieId)
      const response = await fetch(`${config.hostUrl}/api/movies/${movieId}`, {
        method: "GET",
        headers: {
          'x-auth-token': jwt
        }
      })
      if (!response.ok) throw new Error('movie not found')
      const data = await response.json()
      console.log(data)
      setMovie(data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if (movieId) {
      getMovie()
    }
  }, [movieId])

  const handleCross = () => {
    setPopup(false)
  }

  function setStar(){
    const yellowStars = parseInt(movie.starRating / 2)
    const whiteStars = 5 - yellowStars
    const stars = []
    for (let i = 0; i < yellowStars; i++) {
      stars.push(<FontAwesomeIcon key={i} icon={faStar} style={{ color: 'yellow' }} />)
    }
    for (let i = 0; i < whiteStars; i++) {
      stars.push(<FontAwesomeIcon key={i} icon={faStar} style={{ color: 'white' }} />)
    }
    return stars

  }

  const handleRent = async () => {
    const jwt = localStorage.getItem('jwt')
    if(rented){
      return alert('movieAlready rented')
    }
    const userId = localStorage.getItem("_id")
    console.log(userId, movieId)
    try {
      const response = await fetch(`${config.hostUrl}/api/rentals`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': jwt
        },
        body: JSON.stringify({
          userId,
          movieId
        })
      })
      
      if(!response.ok) throw new Error('cannot rent movie')
      setRented(true)
    
    } catch (error) {
      console.log(error)
    }

  }

  return (
    <div className='fixed bottom-0 left-[200px] bg-[#313131] w-[75%] h-[85%] rounded-2xl z-2'>
      {movie ? (
        <div className='flex w-full px-10 my-10'>
          <img className='w-[600px] h-[500px] rounded-3xl shadow-xl' src={movie.url} alt="" />
          <div className='flex flex-col w-full px-14 text-white'>
            <div className='flex flex-col justify-start items-center w-full h-[50px] mb-6'>
              <h1 className='text-5xl text-gray-300 font-semibold font-mono'>{movie.title}</h1>
            </div>
            <div className='font-mono mb-5'>
              <p className='text-xl mb-2'><span className='text-red-600 font-semibold'>Genre:</span> {movie.genre.name}</p>
              <p className='text-xl mb-2'><span className='text-red-600 font-semibold'>Year:</span> {movie.year}</p>
              <p className='text-xl mb-2'><span className='text-red-600 font-semibold'>Rating:</span> {movie.starRating} { setStar() }</p>
              <p className='text-xl mb-2'><span className='text-red-600 font-semibold'>Description:</span> <br/>Lorem ipsum dolor, sit amet 
              consectetur adipisicing elit. Dolor obcaecati error optio sunt, illo in, 
              odio magnam consectetur dicta fugit animi tempora ipsa voluptatum? Lorem 
              ipsum dolor sit amet consectetur adipisicing elit.</p>
              <p className='text-xl mb-2'><span className='text-red-600 font-semibold'>Number in stock:</span> {movie.numberInStock}</p>
              <p className='text-xl mb-2'><span className='text-red-600 font-semibold'>Daily Rental Rate:</span> {movie.dailyRentalRate}</p>

            </div>
            <div className='w-full flex flex-col justify-center items-center'>
              <button 
                onClick={handleRent}
                className='flex justify-center items-center h-[60px] w-[200px] bg-red-700
                rounded-lg active:scale-95 hover:shadow-xl hover:bg-red-900'
              >
              {
                !rented?(
                  <>
                    <span className='text-2xl mr-2 font-semibold font-mono'>Rent Now</span>
                    <BiCameraMovie size='40px' />
                  </>
                  ):
                  (
                  <>
                    <span className='text-2xl mr-2 font-semibold font-mono'>Rented</span>
                    <SiTicktick size='40px' />
                  </>)
              }
                
              </button>
            </div>
          </div>
        </div>

      ) : (<div>Loading...</div>)}
      <button
        onClick={handleCross}
        className='absolute top-[-50px] right-[-50px]'
      >
        <RxCross2 className='hover:text-red-700 text-white active:scale-95' style={{ fontSize: '50px' }} />

      </button>
    </div>
  )
}

export default Popup
