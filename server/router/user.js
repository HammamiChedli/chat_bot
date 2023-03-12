const express = require('express')
const route = express.Router()
const auth = require('../controller/auth')


route.post('/signin/', auth.signin)
route.post('/signup/', auth.signup)

module.exports = route