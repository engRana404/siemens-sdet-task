const supertest = require('supertest');
const testData = require('../test_data/testData');

const request = supertest('http://localhost:3000');

describe('Protected Routes', () => {
  let token;

  beforeAll(async () => {
    // Authenticate to get token
    const response = await request
    .post(testData.endpoints.auth)
    .send({
      email: testData.users.validUser.email,
      password: testData.users.validUser.password,
    });

    token = response.body.token;
  });

  describe('Access Control', () => {
    test('should deny access without token', async () => {
      const response = await request.get(testData.endpoints.users);
      expect(response.statusCode).toBe(401);
    });

    test('should allow access with valid token', async () => {
      const response = await request
        .get(testData.endpoints.users)
        .set('Authorization', token);
      
      expect(response.statusCode).toBe(200);
    });

    test('should deny access with invalid token', async () => {
      const response = await request
        .get(testData.endpoints.users)
        .set('Authorization', 'invalid-token');
      
      expect(response.statusCode).toBe(403);
    });
  });

  describe('PATCH /api/v1/users - Update User', () => {
    test('should update user with valid token', async () => {
      const response = await request
        .patch(testData.endpoints.users)
        .set('Authorization', token)
        .send(testData.users.updateData);
      
      expect(response.statusCode).toBe(200);
    });

    test('should reject update without token', async () => {
      const response = await request
        .patch(testData.endpoints.users)
        .send(testData.users.updateData);
      
      expect(response.statusCode).toBe(401);
    });

    test('should reject Update user with no fields', async () => {
      const response = await request
        .patch(testData.endpoints.users)
        .set('Authorization', token)
        .send({});

      expect(response.statusCode).toBe(400);
    });
  });
  
  test('should delete user with valid token', async () => {
    // Create the user
    const createResponse = await request
      .post(testData.endpoints.users)
      .send({
        email: "user@example.com",
        password: "user123"
      });
    
    // Login to get token
    const loginResponse = await request
      .post(testData.endpoints.auth)
      .send({
          email: "user@example.com", 
          password: "user123"
      });
    expect(loginResponse.statusCode).toBe(200);

    const token = loginResponse.body.token;
    expect(token).toBeDefined();

    // Delete the user
    const deleteResponse = await request
      .delete(testData.endpoints.users)
      .set('Authorization', token);

    console.log('Response body:', deleteResponse.body);
    expect(deleteResponse.statusCode).toBe(200);
  });
});