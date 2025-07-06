const supertest = require('supertest');
const request = supertest('http://localhost:3000');

beforeAll(async () => {
  await request.delete('/api/v1/all-users').send({"key_admin": "keyadmin123"});
});

describe('POST /api/v1/users', () => {
  describe('Register a new user', () => {
    test('should respond with a 200 status code', async () => {
      const response = await request.post('/api/v1/users').send({
        "name": "user", 
        "email": "user@example.com", 
        "password": "user123" 
      })
      expect(response.statusCode).toBe(200)
      expect(response.body).toEqual({
        "message": "User registered with success"
      })
    })
    test("should specify json in the content type header", async () => {
      const response = await request.post('/api/v1/users').send({
        "name": "user", 
        "email": "user@example.com", 
        "password": "user123" 
      })
      expect(response.headers['content-type']).toEqual(expect. stringContaining("json"))
    })
  })

  describe('Login with valid credentials', () => {
    test('should respond with a 200 status code', async () => {
      const response = await request.post('/api/v1/auth').send({
        "email": "user@example.com", 
        "password": "user123" 
      })
      expect(response.statusCode).toBe(200)
    })
  })
})

describe('DELETE /api/v1/all-users', () => {
  describe('Delete all users', () => {
    test('should respond with a 200 status code', async () => {
      const response = await request.delete('/api/v1/all-users').send({
        "key_admin": "keyadmin123"
      })
      expect(response.statusCode).toBe(200)
    })
    test("should specify json in the content type header", async () => {
      const response = await request.delete('/api/v1/all-users').send({
        "key_admin": "keyadmin123"
      })
      expect(response.headers['content-type']).toEqual(expect. stringContaining("json"))
    })
    test("Should respond with a success message", async () => {
      const response = await request.delete('/api/v1/all-users').send({
        "key_admin": "keyadmin123"
      })
      expect(response.body).toEqual({
        "message": "Users deleted with success"
      })
    })
  })
})

