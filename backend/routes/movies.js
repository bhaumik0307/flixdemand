const auth = require('../middleware/auth')
const admin = require('../middleware/admin')
const mongoose = require('mongoose')
const express = require('express')
const router = express.Router()
const { Movie, validateMovie } = require('../models/movie')
const { Genre } = require('../models/genre')

router.get('/', auth, async (req, res) => {
    const q = req.query
    if(q.genreId){
        const id = q.genreId
        const movies = await Movie.find({'genre._id': id})
        res.send(movies)
    }
    else{
        const movies = await Movie.find()
        res.send(movies)

    }
})

router.post('/', auth, async (req, res) => {
    const {error} = validateMovie(req.body)
    if(error) return res.status(400).send(error.details[0].message)

    const genre = await Genre.findById(req.body.genreId)
    if(!genre) return res.status(404).send('genre not found')

    const movie = new Movie({
        title: req.body.title,
        genre: genre,
        url: req.body.url,
        starRating: req.body.starRating,
        year: req.body.year,
        numberInStock: req.body.numberInStock,
        dailyRentalRate: req.body.dailyRentalRate
    })

    await movie.save()

    res.send(movie)
})

router.put('/:id', auth, async (req, res) => {
    const {error} = validateMovie(req.body)
    if(error) return res.status(400).send(error.details[0].message)

    const genre = await Genre.findById(req.body.genreId)
    if(!genre) return res.status(404).send('genre not found')

    const movie = await Movie.findByIdAndUpdate(req.params.id, { 
        title: req.body.title,
        genre: genre,
        url: req.body.url,
        starRating: req.body.starRating,
        year: req.body.year,
        numberInStock: req.body.numberInStock,
        dailyRentalRate: req.body.dailyRentalRate
     }, {new: true})

    if(!movie) return res.status(404).send('The movie with the ID was not found')

    res.send(movie)
})

router.delete('/:id', auth, async (req, res) => {
    const movie = await Movie.findByIdAndDelete(req.params.id)

    if(!movie) return res.status(404).send('The movie with the ID was not found')

    res.send(movie)
})

router.get('/:id', auth, async (req, res) => {
    const movie = await Movie.findById(req.params.id)

    if(!movie) return res.status(404).send('The movie with the ID was not found')

    res.send(movie)
})

module.exports = router