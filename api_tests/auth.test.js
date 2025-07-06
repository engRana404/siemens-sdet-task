const supertest = require('supertest');
const request = supertest('http://localhost:3000');

describe('POST /api/v1/users', () => {
  describe('Register a new user', () => {
    test('should respond with a 200 status code', async () => {
      const response = await request.post('/api/v1/users').send({
        "name": "user", 
        "email": "user@example.com", 
        "password": "user123" 
      })

      expect(response.statusCode).toBe(200)
    })
  })
})



