const {test, describe} = require('node:test')
const assert = require('node:assert')
const dummy = require('../utils/list_helper').dummy

test('dummy return 1', () => {
    const blogs = []

    assert.strictEqual(dummy(blogs), 1)
})