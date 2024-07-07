import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
const Carousel = ({handleWatch}) => {
  const navigate = useNavigate()
  const info = [
    {
      _id: 1,
      starRating: 6.7,
      year: 2023,
      title: "Despicable me 4",
      url: "/img/for-carousel/despicable-me-4.jpg",
      genre: "comedy"
    },
    {
      _id: 2,
      starRating: 7.8,
      year: 2023,
      title: "Dune 2",
      url: "/img/for-carousel/dune-2.jpg",
      genre: "thriller"
    },{
      _id: 3,
      starRating: 8.7,
      year: 2023,
      title: "Ghosted",
      url: "/img/for-carousel/ghosted.jpg",
      genre: "drama/action"
    },{
      _id: 4,
      starRating: 7.5,
      year: 2024,
      title: "Hitman",
      url: "/img/for-carousel/hitman.jpg",
      genre: "comedy"
    },
  ]
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((current + 1) % info.length)
    }, 4000)

    return () => clearInterval(interval)
  }, [current])

  return (
    <div className='relative w-full h-full rounded-[50px] overflow-hidden'>
      <div className='flex transition-transform duration-1000' style={{ transform: `translateX(-${current * 100}%)` }}>
        {
          info.map(({ _id, starRating, year, title, url, genre }) => (
            <div key={_id} className='relative w-full h-[400px] flex-shrink-0'>
              <img className='brightness-110 object-cover' src={url} alt="" />
              <h1 className='absolute left-[90px] bottom-[120px] font-mono text-white text-4xl font-bold'>{title}</h1>
              <p className='absolute left-[90px] bottom-[80px] font-mono text-white text-lg'>{year} &#x2022; {genre}</p>

            </div>
          ))
        }

      </div>
      <a
        href="#movies"
        className='absolute right-[90px] bottom-[90px] text-white bg-red-800 bg-opacity-90 rounded-2xl w-32 h-12 active:scale-95 flex justify-center items-center'
        
      >
        
        <span className='text-xl'>Watch</span></a>
    </div>
  )
}

export default Carousel
