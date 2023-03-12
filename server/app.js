const express = require('express')
const cors = require('cors')
const userRoutes = require('./router/user')
const chatRoutes = require('./router/chat')
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser')
const path = require('path')

const dotenv = require('dotenv')
dotenv.config()

const app = express()
app.use(
    express.urlencoded({
        extended: true,
    })
);
app.use(express.static('./public'))

app.use(express.json())
app.use(cookieParser())


// Add CORS in the headers
app.use(cors({ origin: '*', methods: ['GET', 'POST', 'DELETE', 'UPDATE', 'PUT', 'PATCH'] }))

mongoose.connect(`mongodb+srv://${process.env.NAME}:${process.env.PASSWORD}.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(() => console.log('Connexion à MongoDB échouée !'))

app.use('/api', chatRoutes)
app.use('/', userRoutes)

app.get('/api/chat', (req, res, next) => {

    res.status(200).sendFile(path.join(__dirname, '/public/chat.html'))
})
app.get('/api/chat/style.css', (req, res) => {
    res.status(200).sendFile(path.join(__dirname, '/public/style.css'))
})

app.get('/api/chat/main.js', (req, res) => {
    res.status(200).sendFile(path.join(__dirname, '/public/main.js'))
})

module.exports = app 