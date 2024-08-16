const {test, describe} = require('node:test')
const assert = require('node:assert')
const blogs = require("./test.helper");
const mostLikes = require('../utils/list_helper').mostLikes

describe('most likes', () => {
    test('bigger list of blogs', () => {
        const blogs = require('./test.helper')
        assert.deepStrictEqual(mostLikes(blogs), {author: 'Edsger W. Dijkstra', likes: 17})

    })
    test('zero return {undefined, 0}', () => {
        assert.deepStrictEqual(mostLikes([]), {author: undefined, likes: 0})
    })
    test('one blog returns excepted result', () => {
        const blog = [
            {
                _id: '5a422aa71b54a676234d17f8',
                title: 'Go To Statement Considered Harmful',
                author: 'Edsger W. Dijkstra',
                url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
                likes: 5,
                __v: 0
            }
        ]

        assert.deepStrictEqual(mostLikes(blog), {author: 'Edsger W. Dijkstra', likes: 5})
    })
})