const mongoose = require('mongoose')
const Joi = require('joi')

Joi.objectId = require('joi-objectid')(Joi)

const rentalSchema = new mongoose.Schema({
    customer: {
        type: new mongoose.Schema({
            name: {
                type: String,
                required: true
            },
            email: {
                type: String,
                required: true
            }
        }),
        required: true
    },
    movie: {
        type: new mongoose.Schema({
            title: {
                type: String,
                required: true
            },
            dailyRentalRate: {
                type: Number,
                required: true
            },
            url: {
                type: String,
                required: true
            }
        }),
        required: true
    },
    dateOut: {
        type: Date,
        required: true,
        default: Date.now
    },
    dateReturned: {
        type: Date
    },
    rentalFee: {
        type: Number,
        min: 0
    }
})

const Rental = mongoose.model('Rental', rentalSchema)

function validate (rental) {
    const schema = Joi.object({
        userId: Joi.objectId().required(),
        movieId: Joi.objectId().required()
    })

    return schema.validate(rental)
}

exports.Rental = Rental
exports.validate = validate