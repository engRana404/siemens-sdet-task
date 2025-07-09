const testData = {
  users: {
    validUser: {
      name: "John Doe",
      email: "john.doe@example.com",
      password: "securePassword123"
    },
    invalidUserEmail: {
      name: "Invalid User",
      email: "invalid-email",
      password: "securePassword123"
    },
    invalidUserPassword: {
      name: "Invalid User",
      email: "invalid.user@example.com",
      password: "123"
    },
    withoutPassword: {
      name: "Jane Doe",
      email: "jane.doe@example.com"
    },
    updateData: {
      name: "Updated Name"
    }
  },
  admin: {
    key: "keyadmin123"
  },
  endpoints: {
    users: '/api/v1/users',
    auth: '/api/v1/auth',
    allUsers: '/api/v1/all-users'
  }
};

module.exports = testData;