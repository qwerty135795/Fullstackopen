const loginRouter = require('express').Router()
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

loginRouter.post('/',async  (request, response) => {
    const {username, password} = request.body

    const user = await User.findOne({username})
    const passwordCorrect = !user ? false : await bcrypt.compare(password, user.passwordHash)

    if (!(user && passwordCorrect)) {
        return response.status(401).json({error: 'username or password incorrect'})
    }

    const userForToken = {
        username: user.username,
        id: user._id
    }

    const token = jwt.sign(userForToken, process.env.SECRET)

    response.status(200)
        .send({token, username: user.username, name: user.name})
})

module.exports = loginRouter