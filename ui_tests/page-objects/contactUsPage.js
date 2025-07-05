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
        { email: "test@test.com", message: "Valid msg", orderRef: "1234567890"},
    ],
}
