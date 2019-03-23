const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const cors = require('cors')

const app = express()

app.use(cors())

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, '../public')))

const indexRouter = require('./routes')
const usersRouter = require('./routes/users')
const roomRouter = require('./routes/rooms')

app.use('/', indexRouter)
app.use('/users', usersRouter)
app.use('/room', roomRouter)

module.exports = app
