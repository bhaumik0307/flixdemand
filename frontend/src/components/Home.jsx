import React, { useEffect, useState, useRef } from 'react'
import config from '../config/config'
import Carousel from './Carousel'
import Genres from './Genres'
import Card2 from './Card2'
import Popup from './Popup'


const Home = () => {
  const [movies, setMovies] = useState([])
  const [popup, setPopup] = useState(false)
  const [selectedId, setSelectedId] = useState('')

  async function getMovies(genreId = '') {
    const jwt = localStorage.getItem('jwt')

    try {
      const response = await fetch(`${config.hostUrl}/api/movies?genreId=${genreId}`, {
        method: "GET",
        headers: {
          'x-auth-token': jwt
        }
      })
      if (!response.ok) throw new Error('cannot fetch movies')

      const data = await response.json()
      setMovies(data)
      return data

    } catch (error) {
      console.log(error)
      return []
    }
  }

  useEffect(() => {
    getMovies()
  }, [])

  const handleCardClick = (id) => {
    setSelectedId(id)
    setPopup(true)
  }

  return (
    <div className='relative transition-all'>
      <div className='flex flex-col md:flex-row w-full'>
        <div className='md:w-[77%] w-full bg-[#111111] flex flex-col items-center'>

          <div className='w-full md:w-[1000px] mb-6 mt-10'>
            <Carousel />
          </div>

          <div id="movies" className='flex flex-col w-full justify-start py-5 text-white px-4 md:pl-10'>
            <h1 className='text-2xl font-semibold'>Recommended</h1>
            <div className='flex py-10 flex-wrap'>
              {movies.map(({ _id, starRating, year, title, url }) => (
                <div
                  key={_id}
                  className='hover:cursor-pointer active:scale-95'
                  onClick={() => handleCardClick(_id)}
                >
                  <Card2

                    movieId={_id}
                    title={title}
                    rating={starRating}
                    year={year}
                    url={url}

                  />
                </div>
              ))}
            </div>
          </div>

        </div>
        <div className='w-[23%]'>
          <Genres movies={movies} getMovies={getMovies} handleCardClick={handleCardClick} />
        </div>
      </div>
      {popup && (
        <>
          <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-1"></div>
          <Popup movieId={selectedId} setPopup={setPopup} />
        </>
      )}
    </div>
  )
}

export default Home
