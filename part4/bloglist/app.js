const express = require('express')
const app = express()
require('express-async-errors')
const configs = require('./utils/configs')
const cors = require('cors')
const mongoose = require("mongoose");
const middleware = require('./utils/middleware')
const mongoUrl = configs.MONGO_URI
mongoose.connect(mongoUrl)
    .then(res => console.log('Connected to mongo'))
const blogsRouter = require('./controllers/blogs')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')

app.use(cors())
app.use(express.json())
app.use(middleware.tokenExtractor)
app.use('/api/blogs', middleware.userExtractor ,blogsRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)
app.use(middleware.errorHandler)
module.exports = app