const supertest = require('supertest');
const testData = require('../test_data/testData');

const request = supertest('http://localhost:3000');

describe('Authentication', () => {
  beforeAll(async () => {
    console.log("Starting Authentication Tests");
    // Clean up any existing users before tests
    console.log("Cleaning up existing users");
    // Ensure clean state and create test user
    await request.delete(testData.endpoints.allUsers)
      .send({ key_admin: testData.admin.key });
    
    console.log("Creating test user for authentication tests");
    // Create a valid user for testing login
    await request.post(testData.endpoints.users)
      .send(testData.users.validUser);
  });

  describe('POST /api/v1/auth - Login', () => {
    test('should login with valid credentials', async () => {
      console.log("Testing login with valid credentials");
      const response = await request
        .post(testData.endpoints.auth)
        .send({
          email: testData.users.validUser.email,
          password: testData.users.validUser.password
        });
      
      console.log("Response received for valid login:", response.body);
      expect(response.statusCode).toBe(200);
      expect(response.body).toHaveProperty('token');
      expect(typeof response.body.token).toBe('string');
    });

    test('should reject invalid credentials', async () => {
      console.log("Testing login with invalid credentials");
      const response = await request
        .post(testData.endpoints.auth)
        .send({
          email: testData.users.validUser.email,
          password: "wrongPassword"
        });
      
      console.log("Response received for invalid login:", response.body);
      expect(response.statusCode).toBe(401);
    });

    test('should reject non-existent user', async () => {
      console.log("Testing login with non-existent user");
      const response = await request
        .post(testData.endpoints.auth)
        .send({
          email: "nonexistent@example.com",
          password: "anyPassword"
        });

      console.log("Response received for non-existent user login:", response.body);
      expect(response.statusCode).toBe(401);
    });
  });

  test('Should reject login with missing fields', async () => {
    console.log("Testing login with missing fields");
    const response = await request
      .post(testData.endpoints.auth)
      .send({
        email: testData.users.validUser.email
      }); 
    
    console.log("Response received for missing fields login:", response.body);
    expect(response.statusCode).toBe(400);
  });
});