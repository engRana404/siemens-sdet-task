const supertest = require('supertest');
const testData = require('../test_data/testData');

const request = supertest('http://localhost:3000');

describe('User Registration', () => {
  beforeAll(async () => {
    console.log("Starting User Registration Tests");
    await request.delete(testData.endpoints.allUsers)
      .send({ key_admin: testData.admin.key });
  });

  describe('POST /api/v1/users - Valid Registration', () => {
    test('should register user successfully', async () => {
      console.log("Testing valid user registration");
      const response = await request
        .post(testData.endpoints.users)
        .send(testData.users.validUser);
      
      console.log("Response received:", response.body);
      expect(response.statusCode).toBe(200);
      expect(response.body).toEqual({
        message: "User registered with success"
      });
      expect(response.headers['content-type']).toEqual(
        expect.stringContaining("json")
      );
    });
  });

  describe('POST /api/v1/users - Invalid Registration', () => {
    test('should reject Register with existing email', async () => {
      console.log("Testing registration with existing email");
      const response = await request
        .post(testData.endpoints.users)
        .send(testData.users.validUser);

      console.log("Response received for existing email:", response.body);
      expect(response.statusCode).toBe(409);
    });

    test('should reject Register with missing password', async () => {
      console.log("Testing registration with missing password");
      const response = await request
        .post(testData.endpoints.users)
        .send(testData.users.withoutPassword);

      console.log("Response received for missing password:", response.body);
      expect(response.statusCode).toBe(400);
    });

    test('should reject invalid email format', async () => {
      console.log("Testing registration with invalid email format");
      const response = await request
        .post(testData.endpoints.users)
        .send(testData.users.invalidUser);

      console.log("Response received for invalid email format:", response.body);
      expect(response.statusCode).toBe(400);
    });

    test('should reject Register with short password', async () => {
      console.log("Testing registration with short password");
      const response = await request
        .post(testData.endpoints.users)
        .send(testData.users.invalidUserPassword);

      console.log("Response received for short password:", response.body);
      expect(response.statusCode).toBe(400);
    });

    test('should reject Register with empty body', async () => {
      console.log("Testing registration with empty body");
      const response = await request
        .post(testData.endpoints.users)
        .send({});

      console.log("Response received for empty body:", response.body);
      expect(response.statusCode).toBe(400);
    });
  });
});