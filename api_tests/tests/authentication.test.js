const supertest = require('supertest');
const testData = require('../test_data/testData');

const request = supertest('http://localhost:3000');

describe('Authentication', () => {
  beforeAll(async () => {
    // Ensure clean state and create test user
    await request.delete(testData.endpoints.allUsers)
      .send({ key_admin: testData.admin.key });
    
    await request.post(testData.endpoints.users)
      .send(testData.users.validUser);
  });

  describe('POST /api/v1/auth - Login', () => {
    test('should login with valid credentials', async () => {
      const response = await request
        .post(testData.endpoints.auth)
        .send({
          email: testData.users.validUser.email,
          password: testData.users.validUser.password
        });
      
      expect(response.statusCode).toBe(200);
      expect(response.body).toHaveProperty('token');
      expect(typeof response.body.token).toBe('string');
    });

    test('should reject invalid credentials', async () => {
      const response = await request
        .post(testData.endpoints.auth)
        .send({
          email: testData.users.validUser.email,
          password: "wrongPassword"
        });
      
      expect(response.statusCode).toBe(401);
    });

    test('should reject non-existent user', async () => {
      const response = await request
        .post(testData.endpoints.auth)
        .send({
          email: "nonexistent@example.com",
          password: "anyPassword"
        });
      
      expect(response.statusCode).toBe(401);
    });
  });

  test('Should reject login with missing fields', async () => {
    const response = await request
      .post(testData.endpoints.auth)
      .send({
        email: testData.users.validUser.email
      }); 
    expect(response.statusCode).toBe(400);
  });
});