
const express = require('express')
const route = express.Router()
const bot = require('../controller/chat')


route.post('/chat/', bot.chat)


module.exports = route

