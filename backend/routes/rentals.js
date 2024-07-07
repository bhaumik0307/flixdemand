const auth = require('../middleware/auth')
const admin = require('../middleware/admin')
const mongoose = require('mongoose')
const express = require('express')
const { Rental, validate } = require('../models/rental')
const { Movie } = require('../models/movie')
const { User } = require('../models/user')
const router = express.Router()

router.get('/', auth, async (req, res) => {
    const q = req.query
    if(q.userId) {
        const id = q.userId
        const rentals = await Rental.find({"customer._id" : id}).sort('-dateOut')
        res.send(rentals)
    }
    else{
        const rentals = await Rental.find().sort('-dateOut')
        res.send(rentals)

    }
})

router.post('/', auth, async (req, res) => {
    const {error} = validate(req.body)
    if(error) return res.status(400).send(error.details[0].message)

    const user = await User.findById(req.body.userId)
    if(!user) return res.status(400).send('Invalid user')

    const movie = await Movie.findById(req.body.movieId)
    if(!movie) return res.status(400).send('Invalid movie')

    if(movie.numberInStock === 0) return res.status(400).send('Movie not available')

    const rental = new Rental({
        customer: {
            _id: user._id,
            name: user.name,
            email: user.email
        },
        movie: {
            _id: movie._id,
            title: movie.title,
            dailyRentalRate: movie.dailyRentalRate,
            url: movie.url
        },
    })

    movie.numberInStock--
    await movie.save()

    await rental.save()

    res.send(rental)
})

router.get('/:id', auth, async (req, res) => {
    const rental = await Rental.findById(req.params.id);
  
    if (!rental) return res.status(404).send('The rental with the given ID was not found.');
  
    res.send(rental);
});
  
module.exports = router; 