const supertest = require('supertest');
const testData = require('../test_data/testData');

const request = supertest('http://localhost:3000');

describe('User Registration', () => {
  beforeAll(async () => {
    await request.delete(testData.endpoints.allUsers)
      .send({ key_admin: testData.admin.key });
  });

  describe('POST /api/v1/users - Valid Registration', () => {
    test('should register user successfully', async () => {
      const response = await request
        .post(testData.endpoints.users)
        .send(testData.users.validUser);
      
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
      const response = await request
        .post(testData.endpoints.users)
        .send(testData.users.validUser);
      
      expect(response.statusCode).toBe(409);
    });

    test('should reject Register with missing password', async () => {
      const response = await request
        .post(testData.endpoints.users)
        .send(testData.users.withoutPassword);

      expect(response.statusCode).toBe(400);
    });

    test('should reject invalid email format', async () => {
      const response = await request
        .post(testData.endpoints.users)
        .send(testData.users.invalidUser);
      
      expect(response.statusCode).toBe(400);
    });

    test('should reject Register with short password', async () => {
      const response = await request
        .post(testData.endpoints.users)
        .send(testData.users.invalidUserPassword);

      expect(response.statusCode).toBe(400);
    });

    test('should reject Register with empty body', async () => {
      const response = await request
        .post(testData.endpoints.users)
        .send({});
      
      expect(response.statusCode).toBe(400);
    });
  });
});