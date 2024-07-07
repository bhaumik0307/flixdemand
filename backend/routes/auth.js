const _ = require('lodash')
const bcrypt = require('bcrypt')
const Joi = require('joi')
const express = require('express')
const { User } = require('../models/user')
const router = express.Router()

router.post('/', async (req, res) => {
    const {error} = validate(req.body)
    if(error) return res.status(400).send(error.details[0].message)

    let user = await User.find({ email: req.body.email })
    if(user.length===0) return res.status(400).send('Incorrect email or password')

    const validPassword = await bcrypt.compare(req.body.password, user.password)
    if(!validPassword) return res.status(400).send('Incorrect email or password')

    const token = user.generateAuthToken()
    res.header('x-auth-token', token).send(_.pick(user, ['_id', 'name', 'email']))
})


function validate(req) {
    const schema = Joi.object({
        email: Joi.string().min(5).max(255).required().email(),
        password: Joi.string().min(5).max(255).required()
    })

    return schema.validate(req)
}

module.exports = router