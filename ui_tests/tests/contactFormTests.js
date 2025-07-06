const selectors = require("../page-objects/contactUsPage").selectors;
const testData = require("../page-objects/contactUsPage").testData;

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
            .setValue(selectors.contactSubject, testData[0].subject)
            .setValue(selectors.email, testData[0].email)
            .setValue(selectors.orderRef, testData[0].orderRef)
            .setValue(selectors.message, testData[0].message)
            .uploadFile(selectors.fileUpload, require('path').resolve(__dirname, '../uploads/test.txt'))
            .click(selectors.submitButton)
            .assert.textContains(selectors.successAlert, "Your message has been successfully sent to our team.")
    },

    "Submission without Optional Fields": function(browser) {
        browser
            .setValue(selectors.contactSubject, testData[1].subject)
            .setValue(selectors.email, testData[1].email)
            .setValue(selectors.message, testData[1].message)
            .click(selectors.submitButton)
            .assert.textContains(selectors.successAlert, "Your message has been successfully sent to our team.")
    }
}
