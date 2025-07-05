module.exports = {
    selectors : {
        contactSubject: "#id_contact",
        email: "#email",
        orderRef: "#id_order",
        message: "#message",
        fileUpload: "#fileUpload",
        submitButton: "#submitMessage",
        successAlert: ".alert.alert-success"
    },

    testData : [
        {subject: "Customer service", email: "test@test.com", orderRef: "1234567890", message: "This is a test message"},
        {subject: "Customer service", email: "test@test.com", message: "This is a test message"},
        {subject: "Customer service", email: "test@test.com", message: "This is a test message"},
    ],
}
