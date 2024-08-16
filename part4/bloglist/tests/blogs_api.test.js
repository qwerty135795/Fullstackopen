const {test,after, beforeEach, describe, before } = require('node:test')
const assert = require('node:assert')
const supertest = require('supertest')
const app = require('../app')
const mongoose = require('mongoose')
const api = supertest(app)
const Blog = require('../models/blog')
const blogs = require('./test.helper')
let token = undefined
before(async () => {
    token = `Bearer ${(await api.post('/api/login')
        .send({username: 'lilia', password:'test'})).body.token}`
})
beforeEach(async () => {
    await Blog.deleteMany({})
    const blogsObj = blogs.map(blog => new Blog(blog))

    const promises = blogsObj.map(async (obj) => await obj.save())

    await Promise.all(promises)
})
describe('deletion of blog', () => {
    test('valid id', async () => {
        await api.delete(`/api/blogs/${blogs[0]._id}`)
            .set('Authorization', token)
            .expect(204)
        const response = await api.get('/api/blogs')
        assert.strictEqual(response.body.length, blogs.length - 1)
    })

    test('invalid id', async () => {
        await api.delete('/api/blogs/123')
            .set('Authorization', token)
            .expect(400)
    })
})

describe('update blog', () => {
    test('update likes',async () => {
        let blog = blogs[0]
        const updatedBlog =await  api.put(`/api/blogs/${blog._id}`).send({likes: blog.likes + 1})
        assert.strictEqual(updatedBlog.body.likes, blog.likes +1)

    })
})

test('get return right count of blogs', async () => {
    const response = await api
        .get('/api/blogs')
        .expect('Content-Type', /application\/json/)

    assert.strictEqual(response.body.length, blogs.length)
})


test('id property name === id', async () => {
    const response = await api.get('/api/blogs')
    const blog = response.body[0]
    assert(Object.keys(blog).includes('id'))
})

test('correct model saved in backend', async () => {
    const blog = {
        title: 'new blog',
        author: 'new author',
        url: 'lol',
        likes: '12'
    }
    const blogRes = await api.post('/api/blogs')
        .send(blog)
        .set('Authorization', token)
        .expect(201)
        .expect('Content-Type', /application\/json/)
    const response = await api.get('/api/blogs')
    assert.strictEqual(response.body.length, blogs.length + 1)
    assert.strictEqual(blogRes.body.likes, 12)
})
test('auto set likes to zero, when undefined', async () => {
    const blog = {
        title: 'new blog',
        author: 'new author',
        url: 'lol'
    }
    const response = await api.post('/api/blogs')
        .send(blog)
        .set('Authorization', token)
        .expect(201)
        .expect('Content-Type', /application\/json/)

    assert.strictEqual(response.body.likes, 0)
})

test('response 400 when title or url undefined', async () => {
    const blog = {
        author: 'new author',
        url: 'lol',
        likes: '12'
    }

    await api.post('/api/blogs')
        .send(blog)
        .set('Authorization', token)
        .expect(400)
})

test('401 when add blog without token',async () => {
    const blog = {
        title: 'new blog',
        author: 'new author',
        url: 'lol',
        likes: '12'
    }
    const blogRes = await api.post('/api/blogs')
        .send(blog)
        .expect(401)

    const response = await api.get('/api/blogs')
    assert.strictEqual(response.body.length, blogs.length)
})

after(() => {
    mongoose.connection.close()
})