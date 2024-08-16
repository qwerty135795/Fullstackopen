const blogService = require("../models/blog");
const blogsRouter = require('express').Router()
const Blog = blogService
const User = require('../models/user')
const jwt = require('jsonwebtoken')
blogsRouter.get('/', async (request ,response) => {
    const res = await Blog.find({}).populate('user', {username:1, name: 1})
    return response.json(res)
})
blogsRouter.post('/', async (request, response) => {
    const {title, url} = request.body
    if (!title || !url) return response.status(400).end()
    if (!request.user) return response.status(401).end()
    const user = await User.findById(request.user.id)
    const blog = new Blog({...request.body, likes: request.body.likes ?? 0, user: user.id})
    const res = await blog.save()
    user.blogs.push(blog)
    user.save()
    response.status(201).json(res)
})
blogsRouter.delete('/:id', async (request, response) => {
    if (!request.user) return response.status(401).end()
    const user = await User.findById(request.user.id)
    try {
        const blog = await Blog.findById(request.params.id)
        if (user.id === blog.user.toString()) {
            await Blog.findByIdAndDelete(blog.id)
            user.blogs = user.blogs.filter(b => b.id !== blog.id)
            await user.save()
            response.status(204).end()
        } else {
            response.status(403).json({error: 'only creater can delete blog'})
        }
    } catch (ex) {
        return response.status(400).json({error: 'invalid id'})
    }
})
blogsRouter.put('/:id', async (request, response) => {
    const blog = await Blog.findByIdAndUpdate(request.params.id, request.body, {new: true})
    response.json(blog)
})
module.exports = blogsRouter