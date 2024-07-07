import React, { useEffect, useState } from 'react'
import Card1 from './Card1'

const Genres = ({ movies, getMovies, handleCardClick }) => {
  const [genres, setGenres] = useState([])
  const topRatedMovies = movies.sort((a, b) => b.starRating - a.starRating).slice(0, 5)

  async function getResponse () {
    const jwt = localStorage.getItem('jwt')
    try {
      const response = await fetch('http://localhost:3000/api/genres', {
        method: "GET",
        headers: {
          'x-auth-token': jwt
        }
      })
      if(!response.ok) throw new Error('Failed to fetch genres')

      const data = await response.json()
      setGenres(data)
      
    } catch (error) {
      console.error(error)
    }

  }

  useEffect(() => {
    getResponse()
  }, [])

  return (
    <div className='bg-[#313131] text-white w-full h-full '>
        <div className='flex justify-between items-center px-10 pt-8 pb-5'>
            <h1 className='text-2xl'>Genre</h1>
            <button onClick={() => getMovies()} className='text-base hover:underline'>All</button>
        </div>
        <div className='flex flex-wrap justify-center items-center mb-20'>
            {genres && genres.map((genre) => (
                
                <button key={genre._id} onClick={ () => getMovies(genre._id) } className='bg-[#1e1e1e] w-[140px] h-[50px] rounded-2xl mx-2 my-2 text-lg active:bg-white active:text-black active:scale-95'>{genre.name}</button>
            ))}
        </div>
        <h2 className='text-xl px-10 mb-2 font-semibold'>Top Rated</h2>
        <div className='ml-3'>
          {topRatedMovies.map(({_id, title, genres, year, starRating, url}) => (
            <div key={_id} onClick={() => handleCardClick(_id)} className='cursor-pointer transition-all hover:scale-105 hover:bg-[#212121] rounded-xl p-1'>
            <Card1 
              
              title= {title}
              genres= {genres}
              year= {year}
              starRating= {starRating}
              url= {url}
            />
            </div>
          ))}
        </div>
        
    </div>
  )
}

export default Genres
