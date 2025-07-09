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
            .assert.containsText("@errorAlert", data.errorMessage)
            .assert.containsText("@errorListItem", testData.messages.emailRequired);
    }
};
