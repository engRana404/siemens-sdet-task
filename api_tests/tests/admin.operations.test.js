const supertest = require('supertest');
const testData = require('../test_data/testData');

const request = supertest('http://localhost:3000');

describe('Admin Operations', () => {
  describe('DELETE /api/v1/all-users', () => {
    test('should delete all users with valid admin key', async () => {
      console.log("Starting Admin Operations Tests");
      const response = await request
        .delete(testData.endpoints.allUsers)
        .send({ key_admin: testData.admin.key });
      
      console.log("Response received for delete all users:", response.body);
      expect(response.statusCode).toBe(200);
      expect(response.body).toEqual({
        message: "Users deleted with success"
      });
      expect(response.headers['content-type']).toEqual(
        expect.stringContaining("json")
      );
    });

    test('should reject deletion with invalid admin key', async () => {
      console.log("Testing deletion with invalid admin key");
      const response = await request
        .delete(testData.endpoints.allUsers)
        .send({ key_admin: "invalid-key" });

      console.log("Response received for invalid admin key:", response.body);
      expect(response.statusCode).toBe(403);
    });

    test('should reject deletion without admin key', async () => {
      console.log("Testing deletion without admin key");
      const response = await request
        .delete(testData.endpoints.allUsers)
        .send({});

      console.log("Response received for deletion without admin key:", response.body);
      expect(response.statusCode).toBe(403);
    });
  });
});