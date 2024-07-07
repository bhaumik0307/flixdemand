const mongoose = require('mongoose')
const {genreSchema} = require('./genre')
const Joi = require('joi')
Joi.objectId = require('joi-objectid')(Joi)

const movieSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 255
    },
    genre: {
        type: genreSchema,
        required: true
    },
    url: {
        type: String,
        required: true
    },
    starRating: {
        type: String,
        required: true
    },
    year: {
        type: Number,
        required: true
    },
    numberInStock: {
        type: Number,
        required: true,
        min: 0,
        max: 255
    },
    dailyRentalRate: {
        type: Number,
        required: true,
        min: 0,
        max: 255
    }
})

const Movie = mongoose.model('Movie', movieSchema)

function validate (movie) {
    const schema = Joi.object({
        title: Joi.string().min(1).max(255).required(),
        genreId: Joi.objectId().required(),
        url: Joi.string().required(),
        starRating: Joi.string().min(1).max(10).required(),
        year: Joi.number().required(),
        numberInStock: Joi.number().min(0).required(),
        dailyRentalRate: Joi.number().min(0).required()
    })

    return schema.validate(movie)
}

exports.validateMovie = validate
exports.Movie = Movie
exports.movieSchema = movieSchema