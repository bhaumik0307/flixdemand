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
    <div className='fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center'>
      <div className='bg-[#313131] max-w-full max-h-full overflow-y-auto rounded-2xl'>
        {movie ? (
          <div className='flex flex-col md:flex-row md:items-center w-full px-6 md:px-10 py-10'>
            <img className='w-full md:w-[600px] h-[500px] object-cover rounded-3xl shadow-xl mb-6 md:mb-0' src={movie.url} alt="" />
            <div className='flex flex-col md:ml-10 text-white'>
              <h1 className='text-3xl md:text-5xl text-gray-300 font-semibold font-mono mb-4'>{movie.title}</h1>
              <div className='font-mono mb-5'>
                <p className='text-xl mb-2'><span className='text-red-600 font-semibold'>Genre:</span> {movie.genre.name}</p>
                <p className='text-xl mb-2'><span className='text-red-600 font-semibold'>Year:</span> {movie.year}</p>
                <p className='text-xl mb-2'><span className='text-red-600 font-semibold'>Rating:</span> {movie.starRating} {setStar()}</p>
                <p className='text-xl mb-2'><span className='text-red-600 font-semibold'>Description:</span> <br />Lorem ipsum dolor sit, amet consectetur adipisicing elit. Esse cum obcaecati nobis reprehenderit saepe fugit ipsam doloribus sed illum. Totam voluptatem dignissimos alias repellat!</p>
                <p className='text-xl mb-2'><span className='text-red-600 font-semibold'>Number in stock:</span> {movie.numberInStock}</p>
                <p className='text-xl mb-2'><span className='text-red-600 font-semibold'>Daily Rental Rate:</span> {movie.dailyRentalRate}</p>
              </div>
              <div className='w-full flex justify-center items-center'>
                <button
                  onClick={handleRent}
                  className='flex justify-center items-center h-[60px] w-[200px] bg-red-700 rounded-lg active:scale-95 hover:shadow-xl hover:bg-red-900'
                >
                  {
                    !rented ? (
                      <>
                        <span className='text-2xl mr-2 font-semibold font-mono'>Rent Now</span>
                        <BiCameraMovie size='40px' />
                      </>
                    ) : (
                      <>
                        <span className='text-2xl mr-2 font-semibold font-mono'>Rented</span>
                        <SiTicktick size='40px' />
                      </>
                    )
                  }

                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className='flex justify-center items-center h-full'>
            <Spinner />
          </div>
        )}
        <button
          onClick={handleCross}
          className='absolute top-4 right-4 text-white'
        >
          <RxCross2 className='hover:text-red-700 text-white active:scale-95' style={{ fontSize: '30px' }} />
        </button>
      </div>
    </div>
  )
}

export default Popup
