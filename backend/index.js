const mongoose = require('mongoose')
const express = require('express')
const config = require('config')
const genres = require('./routes/genres')
const movies = require('./routes/movies')
const rentals = require('./routes/rentals')
const users = require('./routes/users')
const auth = require('./routes/auth')
const cors = require('cors')
const app = express()

if(!config.get('jwtPrivateKey')){
    console.error('FATAL ERROR: jwtPrivateKey is not defined')
    process.exit(1)

}

mongoose.connect(`mongodb+srv://cbhaumik08:${config.get('dbPassword')}@cluster0.fpfx96i.mongodb.net/flixdemand?retryWrites=true&w=majority&appName=Cluster0`)
.then(() => { console.log('connected to database')})
.catch((err) => console.log('something failed'))

app.use(cors({
    exposedHeaders: ['x-auth-token']
}))

app.use(express.json())
app.get('/', (req, res) => {
    res.send('app is running')
})
app.use('/api/genres', genres)
app.use('/api/movies', movies)
app.use('/api/rentals', rentals)
app.use('/api/users', users)
app.use('/api/auth', auth)

const port = process.env.PORT || 3000
app.listen(port, () => {
    console.log(`listening on port ${port}`)
})