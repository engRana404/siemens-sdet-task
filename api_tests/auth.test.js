const supertest = require('supertest');
const request = supertest('http://localhost:3000');

let token;

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
      token = response.body.token
      expect(response.statusCode).toBe(200)
    })
  })
})

describe('GET /api/v1/auth', () => {
  describe('Access protected route without token', () => {
    test('should respond with a 401 status code', async () => {
      const response = await request.get('/api/v1/users')
      expect(response.statusCode).toBe(401)
    })
  })
  describe('Access protected route with token', () => {
    test('should respond with a 200 status code', async () => {
      const response = await request
        .get('/api/v1/users')
        .set('Authorization', token)
      expect(response.statusCode).toBe(200)
    })
  })
})

describe('PATCH /api/v1/users', () => {
  describe("Update user name", () => {
    test("should respond with a 200 status code", async () => {
      const response = await request
        .patch('/api/v1/users')
        .set('Authorization', token)
        .send({
          "name": "Updated Name"
        })
      expect(response.statusCode).toBe(200)
    })
  })
})

describe('DELETE /api/v1/all-users', () => {
  describe("Delete user using valid authentication token", () => {
    test("should respond with a 200 status code", async () => {
      const response = await request
        .delete('/api/v1/users')
        .set('Authorization', token)
      expect(response.statusCode).toBe(200)
    })
  })

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

