const express = require('express')
const dotenv = require('dotenv')
const cors = require('cors')
const userRoutes = require('./router/user')
const chatRoutes = require('./router/chat')
const mongoose = require('mongoose');


dotenv.config()

const app = express()

app.use(express.json())


// Add CORS in the headers
app.use(cors({ origin: '*', methods: ['GET', 'POST', 'DELETE', 'UPDATE', 'PUT', 'PATCH'] }))

mongoose.connect(`mongodb+srv://${process.env.NAME}:${process.env.PASSWORD}.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(() => console.log('Connexion à MongoDB échouée !'));


app.use('/api', chatRoutes)
app.use('/auth', userRoutes)

module.exports = app 