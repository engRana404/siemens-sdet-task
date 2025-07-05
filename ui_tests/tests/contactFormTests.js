const selectors = require("../page-objects/contactUsPage").selectors;

module.exports = {
    before: function(browser) {
        browser.url("http://automationpractice.multiformis.com/index.php?controller=contact");
    },

    after: function(browser) {
        browser.end();
    },

    beforeEach: function(browser) {
        // Refresh page before each test for clean state
        browser.refresh();
    },

    "Submit with all required fields filled": function(browser) {
        browser
            .setValue(selectors.contactSubject, "Customer service")
            .setValue(selectors.email, "test@test.com")
            .setValue(selectors.orderRef, "1234567890")
            .setValue(selectors.message, "This is a test message")
            .uploadFile(selectors.fileUpload, "D:\\SDET\\siemens-sdet-task\\ui_tests\\uploads\\test.txt")
            .click(selectors.submitButton)
            .assert.textContains(selectors.successAlert, "Your message has been successfully sent to our team.")
    },

    "Submission without Optional Fields": function(browser) {
        browser
            .setValue(selectors.contactSubject, "Customer service")
            .setValue(selectors.email, "test@test.com")
            .setValue(selectors.message, "This is a test message")
            .click(selectors.submitButton)
            .assert.textContains(selectors.successAlert, "Your message has been successfully sent to our team.")
    }
}
