
const express = require('express')
const route = express.Router()
const bot = require('../controller/chat')
const auth = require('../middleware/auth')


route.post('/chat/', bot.chat)


module.exports = route

