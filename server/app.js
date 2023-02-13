const express = require('express')
const cors = require('cors')
const userRoutes = require('./router/user')
const chatRoutes = require('./router/chat')
const mongoose = require('mongoose');
const cookies = require('cookie-parser')
const path = require('path')


const dotenv = require('dotenv')
dotenv.config()

const app = express()
app.use(
    express.urlencoded({
        extended: true,
    })
);

app.use(express.json())
app.use(cookies())


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