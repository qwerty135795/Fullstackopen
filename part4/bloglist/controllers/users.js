const usersRouter = require('express').Router()
const bcrypt = require('bcrypt')
const User = require('../models/user')


usersRouter.post('/', async (request, response) => {
    const {username, name, password}= request.body
    if (password.length < 3) {
        return response.status(400).send({error: 'username must be min 3 char length'})
    }
    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)
    const user = new User({
        username,
        name,
        passwordHash
    })

    const savedUser = await user.save()
    response.status(201).json(savedUser)
})

usersRouter.get('/', async (request, response) => {
    const users = await User.find({}).populate('blogs',{title:1, url:1,author:1})
    response.json(users)
})

module.exports = usersRouter