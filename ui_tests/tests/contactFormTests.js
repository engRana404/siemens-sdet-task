module.exports = {
    "Submit with all required fields filled": function(browser) {
        browser
            .url("http://automationpractice.multiformis.com/index.php?controller=contact")
            .setValue("#id_contact", "Customer service")
            .setValue("#email", "test@test.com")
            .setValue("#id_order", "1234567890")
            .setValue("#message", "This is a test message")
            .uploadFile("#fileUpload", "D:\\SDET\\siemens-sdet-task\\ui_tests\\uploads\\test.txt")
            .click("#submitMessage")
            .assert.textContains(".alert.alert-success", "Your message has been successfully sent to our team.")
            .end();
    },

    "Submission without Optional Fields": function(browser) {
        browser
            .url("http://automationpractice.multiformis.com/index.php?controller=contact")
            .setValue("#id_contact", "Customer service")
            .setValue("#email", "test@test.com")
            .setValue("#message", "This is a test message")
            .click("#submitMessage")
            .assert.textContains(".alert.alert-success", "Your message has been successfully sent to our team.")
            .end();
    }
}