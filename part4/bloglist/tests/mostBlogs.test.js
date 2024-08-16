const {test, describe} = require('node:test')
const assert = require('node:assert')
const mostBlogs = require('../utils/list_helper').mostBlogs

describe('most blog', () => {
    test('bigger list of blogs', () => {
        const blogs = require('./test.helper')
        assert.deepStrictEqual(mostBlogs(blogs), {author:'Robert C. Martin', blogs: 3})
    })

    test('1 blog', () => {
        const listWithOneBlog = [
            {
                _id: '5a422aa71b54a676234d17f8',
                title: 'Go To Statement Considered Harmful',
                author: 'Edsger W. Dijkstra',
                url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
                likes: 5,
                __v: 0
            }
        ]

        assert.deepStrictEqual(mostBlogs(listWithOneBlog), {author: 'Edsger W. Dijkstra', blogs:1 })
    })

    test('zero return {undefined, zero}', () => {
        assert.deepStrictEqual(mostBlogs([]), {author: undefined, blogs: 0})
    })
})