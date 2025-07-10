const testData = require('../test_data/contactFormData');

module.exports = {
    beforeEach: function(browser) {
        this.contactPage = browser.page.contactUsPage();
        this.contactPage.navigate();
    },

    afterEach: function(browser) {
        browser.end();
    },

    "Submit with all required fields filled": function(browser) {
        const data = testData.validSubmission;
        
        this.contactPage
            .uploadFile("@fileUpload", require('path').resolve(__dirname, data.file))
            .setValue("@orderRef", data.orderRef)
            .fillRequiredFieldsAndSubmit(data.subject, data.email, data.message)
            .assert.textContains("@successAlert", testData.messages.success);
    },

    "Submission without Optional Fields": function(browser) {
        const data = testData.minimalSubmission;
        
        this.contactPage
            .setValue("@contactSubject", data.subject)
            .setValue("@email", data.email)
            .setValue("@message", data.message)
            .click("@submitButton")
            .assert.textContains("@successAlert", testData.messages.success);
    },

    "Submission with File Upload": function(browser) {
        const data = testData.withFileUpload;
        
        this.contactPage
            .uploadFile("@fileUpload", require('path').resolve(__dirname, data.file))
            .fillRequiredFieldsAndSubmit(data.subject, data.email, data.message)
            .assert.textContains("@successAlert", testData.messages.success);
    },
    "Submit with missing required field (Email)": function(browser) {
        const data = testData.missingEmailSubmission;
        
        this.contactPage
            .setValue("@contactSubject", data.subject)
            .setValue("@message", data.message)
            .click("@submitButton")
            .assert.containsText("@errorAlert", testData.messages.errorMessage)
            .assert.containsText("@errorListItem", testData.messages.emailRequired);
    },
    "Submit with invalid email format": function(browser) {
        const data = testData.invalidEmailSubmission;
        
        this.contactPage
            .setValue("@contactSubject", data.subject)
            .setValue("@email", data.email)
            .setValue("@message", data.message)
            .click("@submitButton")
            .assert.containsText("@errorAlert", testData.messages.errorMessage)
            .assert.containsText("@errorListItem", testData.messages.emailRequired);
    },
    "Submit form without selecting subject": function(browser) {
        const data = testData.requiredFields;

        this.contactPage
            .setValue("@email", data.email)
            .setValue("@message", data.message)
            .click("@submitButton")
            .assert.containsText("@errorAlert", testData.messages.errorMessage)
            .assert.containsText("@errorListItem", testData.messages.subjectRequired);
    },
    "Submit form with empty message": function(browser) {
        const data = testData.requiredFields;
        this.contactPage
            .setValue("@contactSubject", data.subject)
            .setValue("@email", data.email)
            .setValue("@message", "")
            .click("@submitButton")
            .assert.containsText("@errorAlert", testData.messages.errorMessage)
            .assert.containsText("@errorListItem", testData.messages.messageRequired);
    },
    "Submit form with multiple validation errors": function(browser) {
        this.contactPage
            .click("@submitButton")
            .verify.containsText("@errorAlert", testData.messages.multipleErrors)
            .assert.containsText("@errorListItem", testData.messages.emailRequired)
            .verify.containsText("@errorListItem", testData.messages.messageRequired)
            .verify.containsText("@errorListItem", testData.messages.subjectRequired)
    },
    "Submit form with long message (boundary testing)": function(browser) {
        const longMessage = "a".repeat(5000); // Assuming 5000 characters is the limit
        const data = testData.requiredFields;
        this.contactPage
            .setValue("@contactSubject", data.subject)
            .setValue("@email", data.email)
            .setValue("@message", longMessage)
            .click("@submitButton")
            .verify.containsText("@errorAlert", testData.messages.errorMessage)
            .verify.containsText("@errorListItem", testData.messages.messageRequired);
    },
    "Submit with only whitespace in Message field": function(browser) {
        const data = testData.requiredFields;
        this.contactPage
            .setValue("@contactSubject", data.subject)
            .setValue("@email", data.email)
            .setValue("@message", "   ") // Only whitespace
            .click("@submitButton")
            .verify.containsText("@errorAlert", testData.messages.errorMessage)
            .verify.containsText("@errorListItem", testData.messages.messageRequired);
    },
    "Submit with Order Reference exceeding 100 characters": function(browser) {
        const data = testData.requiredFields;
        const longOrderRef = "a".repeat(101); // Assuming 101 characters is the limit
        this.contactPage
            .setValue("@contactSubject", data.subject)
            .setValue("@email", data.email)
            .setValue("@message", data.message)
            .setValue("@orderRef", longOrderRef)
            .click("@submitButton")
            .verify.containsText("@errorAlert", testData.messages.errorMessage)
            .verify.containsText("@errorListItem", testData.messages.orderRefRequired);
    },
    "Upload an unsupported file type": function(browser) {
        const data = testData.invalidFileType;
        const unsupportedFile = require('path').resolve(__dirname, data.file);
        this.contactPage
            .setValue("@contactSubject", data.subject)
            .setValue("@email", data.email)
            .setValue("@message", data.message)
            .setValue("@fileUpload", unsupportedFile)
            .click("@submitButton")
            .verify.containsText("@errorAlert", testData.messages.errorMessage)
            .verify.containsText("@errorListItem", testData.messages.fileTypeUnsupported);
    },
    "Submit Contact Form with Large File": function(browser) {
        const data = testData.largeFileUpload;
        const largeFile = require('path').resolve(__dirname, data.file);
        this.contactPage
            .setValue("@contactSubject", data.subject)
            .setValue("@email", data.email)
            .setValue("@message", data.message)
            .setValue("@fileUpload", largeFile)
            .click("@submitButton")
            .verify.containsText("@errorAlert", testData.messages.errorMessage)
            .verify.containsText("@errorListItem", testData.messages.largeFileUpload);
    },
    // "Submit form with XSS script in message": function(browser) {
    //     const data = testData.requiredFields;
    //     const xssScript = "<script>alert('XSS');</script>";
    //     this.contactPage
    //         .setValue("@contactSubject", data.subject)
    //         .setValue("@email", data.email)
    //         .setValue("@message", xssScript)
    //         .click("@submitButton")
    //         .assert.containsText("@errorAlert", testData.messages.errorMessage)
    //         .assert.containsText("@errorListItem", testData.messages.invalidMessage);
    // },
    // "Submit the form while offline": function(browser) {
    //     const data = testData.requiredFields;
    //     this.contactPage
    //         .setValue("@contactSubject", data.subject)
    //         .setValue("@email", data.email)
    //         .setValue("@message", data.message)
    //         .execute(function() {
    //             window.navigator.onLine = false; // Simulate offline mode
    //         })
    //         .click("@submitButton")
    //         .verify.containsText("@errorAlert", testData.messages.errorMessage)
    //         .verify.containsText("@errorListItem", testData.messages.ErrorOccurred);
    // },
    "Spam protection test (submit form repeatedly)": function(browser) {
        const data = testData.requiredFields;
        for (let i = 0; i < 5; i++) {
            this.contactPage.fillRequiredFieldsAndSubmit(data.subject, data.email, data.message);
            this.contactPage.end();
            this.contactPage.navigate(); // Navigate back to the form for the next submission
        }
        this.contactPage.verify.containsText("@errorAlert", testData.messages.errorMessage);
        this.contactPage.verify.containsText("@errorListItem", testData.messages.ErrorOccurred);
    },
    "Form Resubmission after Error": function(browser) {
        const data = testData.requiredFields;
        this.contactPage
            .setValue("@contactSubject", data.subject)
            .setValue("@message", data.message)
            .click("@submitButton")
            .assert.containsText("@errorAlert", testData.messages.errorMessage)
            .assert.containsText("@errorListItem", testData.messages.emailRequired);
        // Attempt to resubmit the form
        this.contactPage
            .setValue("@email", data.email)
            .click("@submitButton")
            .assert.containsText("@successAlert", testData.messages.success);
    }
}