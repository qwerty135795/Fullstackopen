const {test, describe, after, beforeEach} = require('node:test')
const assert = require('node:assert')
const supertest = require('supertest')
const app = require('../app')
const mongoose = require('mongoose')
const User = require('../models/user')
const api = supertest(app)


describe('creation of user', () => {
    test('password length < 3 return 400', async () => {
        const initValue =  await api.get('/api/users')
        const user = {
            username: 'rose',
            name: 'Rose',
            password: 'wq'
        }
        await api.post('/api/users')
            .send(user)
            .expect(400)
        const response = await api.get('/api/users')

        assert.strictEqual(initValue.body.length, response.body.length)
    })
    test('username length < 3 return 400', async () => {
        const initValue =  await api.get('/api/users')
        const user = {
            username: 'ro',
            name: 'Rose',
            password: 'wqwe'
        }
        await api.post('/api/users')
            .send(user)
            .expect(400)
        const response = await api.get('/api/users')
        assert.strictEqual(initValue.body.length, response.body.length)
    })
})

after(() => {
    mongoose.connection.close()
})

