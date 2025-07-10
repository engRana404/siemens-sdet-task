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
        message: "Missing email"
    },
    invalidEmailSubmission: {
        subject: "Customer service",
        email: "invalid-email",
        message: "Invalid email format"
    },
    requiredFields: {
        subject: "Customer service",
        email: "test@example.com",
        message: "Test message"
    },
    invalidFileType: {
        subject: "Customer service",
        email: "invalid-file@example.com",
        message: "Invalid file type",
        file: "../uploads/unsupported_file.exe"
    },
    largeFileUpload: {
        subject: "Customer service",
        email: "large-file@example.com",
        message: "Large file upload",
        file: "../uploads/LargeFile.pdf"
    },
    messages: {
        success: "Your message has been successfully sent to our team.",
        errorMessage: "There is 1 error",
        multipleErrors: "There are 3 errors",
        emailRequired: "Invalid email address.",
        subjectRequired: "Please select a subject from the list provided.",
        messageRequired: "The message cannot be blank.",
        orderRefRequired: "The order reference must be 100 characters or less.",
        fileTypeUnsupported: "The uploaded file type is not supported.",
        invalidMessage: "Invalid message",
        largeFileUpload: "File size exceeds the limit",
        ErrorOccurred: "An error occurred while sending the message."
    }
};