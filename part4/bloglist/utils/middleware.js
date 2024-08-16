const jwt = require('jsonwebtoken')

const errorHandler = (error,request,response, next) => {
    if (error.name === 'ValidationError') {
        return response.status(400).send({error: 'username must be minimum 3 char length'})
    } else if (error.name === 'JsonWebTokenError') {
        return  response.status(401).send({error: 'invalid token1'})
    } else if (error.name === 'CastError') {
        return response.status(400).send({ error: 'malformatted id' })
    }
    next()
}

const tokenExtractor = (request, response, next) => {
    const authorization = request.get('Authorization')
    request.token = authorization && authorization.startsWith('Bearer') ? authorization.replace('Bearer ', ''): undefined
    next()
}

const userExtractor = (request, response, next) => {
    if (!request.token)return next()
    request.user  = jwt.verify(request.token, process.env.SECRET)
    next()
}

module.exports = {
    errorHandler,
    tokenExtractor,
    userExtractor
}