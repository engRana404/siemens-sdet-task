const supertest = require('supertest');
const testData = require('../test_data/testData');

const request = supertest('http://localhost:3000');

describe('Admin Operations', () => {
  describe('DELETE /api/v1/all-users', () => {
    test('should delete all users with valid admin key', async () => {
      const response = await request
        .delete(testData.endpoints.allUsers)
        .send({ key_admin: testData.admin.key });
      
      expect(response.statusCode).toBe(200);
      expect(response.body).toEqual({
        message: "Users deleted with success"
      });
      expect(response.headers['content-type']).toEqual(
        expect.stringContaining("json")
      );
    });

    test('should reject deletion with invalid admin key', async () => {
      const response = await request
        .delete(testData.endpoints.allUsers)
        .send({ key_admin: "invalid-key" });
      
      expect(response.statusCode).toBe(403);
    });

    test('should reject deletion without admin key', async () => {
      const response = await request
        .delete(testData.endpoints.allUsers)
        .send({});
      
      expect(response.statusCode).toBe(403);
    });
  });
});