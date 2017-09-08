const request = require('supertest')
const app = require('../lib/app')

describe('server', () => {
  test('responds on root with hello world', () => {
    return request(app)
      .get('/')
      .then(response => {
        expect(response.statusCode).toBe(200)
        expect(response.text).toBe('Hello world')
      })
  })
})
