const supertest = require('supertest');
const testData = require('../test_data/testData');

const request = supertest('http://localhost:3000');

describe('Protected Routes', () => {
  let token;

  beforeAll(async () => {
    console.log("Starting Protected Routes Tests");
    // Clean up any existing users before tests
    console.log("Cleaning up existing users");
    await request.delete(testData.endpoints.allUsers)
      .send({ key_admin: testData.admin.key });

    console.log("Creating test user for protected routes tests");
    // Create a valid user for testing
    await request.post(testData.endpoints.users)
      .send(testData.users.validUser);
     
    console.log("Authenticating to get token for protected routes tests");
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
      console.log("Testing access without token");
      const response = await request.get(testData.endpoints.users);
      console.log("Response received for access without token:", response.body);
      expect(response.statusCode).toBe(401);
    });

    test('should allow access with valid token', async () => {
      console.log("Testing access with valid token");
      const response = await request
        .get(testData.endpoints.users)
        .set('Authorization', token);
      
      console.log("Response received for access with valid token:", response.body);
      expect(response.statusCode).toBe(200);
    });

    test('should deny access with invalid token', async () => {
      console.log("Testing access with invalid token");
      const response = await request
        .get(testData.endpoints.users)
        .set('Authorization', 'invalid-token');

      console.log("Response received for access with invalid token:", response.body);
      expect(response.statusCode).toBe(403);
    });
  });

  describe('PATCH /api/v1/users - Update User', () => {
    test('should update user with valid token', async () => {
      console.log("Testing user update with valid token");
      const response = await request
        .patch(testData.endpoints.users)
        .set('Authorization', token)
        .send(testData.users.updateData);
      
      console.log("Response received for user update with valid token:", response.body);
      expect(response.statusCode).toBe(200);
    });

    test('should reject update without token', async () => {
      console.log("Testing user update without token");
      const response = await request
        .patch(testData.endpoints.users)
        .send(testData.users.updateData);

      console.log("Response received for user update without token:", response.body);
      expect(response.statusCode).toBe(401);
    });

    test('should reject Update user with no fields', async () => {
      console.log("Testing user update with no fields");
      const response = await request
        .patch(testData.endpoints.users)
        .set('Authorization', token)
        .send({});

      console.log("Response received for user update with no fields:", response.body);
      expect(response.statusCode).toBe(400);
    });
  });
  
  test('should delete user with valid token', async () => {
    console.log("Testing user deletion with valid token");
    // First, create a user to delete
    console.log("Creating user for deletion test");
    // Create the user
    const createResponse = await request
      .post(testData.endpoints.users)
      .send({
        email: "user@example.com",
        password: "user123"
      });
    expect(createResponse.statusCode).toBe(200);

    console.log("User created successfully, now logging in to get token for deletion");
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
    console.log("Deleting user with valid token");
    const deleteResponse = await request
      .delete(testData.endpoints.users)
      .set('Authorization', token);

    console.log('Response body:', deleteResponse.body);
    expect(deleteResponse.statusCode).toBe(200);
  });
});