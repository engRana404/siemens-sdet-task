module.exports = {
    validSubmission: {
        subject: "Customer service",
        email: "test@example.com",
        message: "Test message",
        orderRef: "12345",
        file: "../uploads/test.txt"
    },
    minimalSubmission: {
        subject: "Customer service",
        email: "minimal@example.com",
        message: "Minimal message"
    },
    withFileUpload: {
        subject: "Customer service",
        email: "upload@example.com",
        message: "File upload message",
        file: "../uploads/test.pdf"
    },
    missingEmailSubmission: {
        subject: "Customer service",
        message: "Missing email",
        errorMessage: "There is 1 error",
    },
    messages: {
        success: "Your message has been successfully sent to our team.",
        emailRequired: "Invalid email address.",
    }
};