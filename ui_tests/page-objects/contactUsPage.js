const contactUsPageCommands = {
    fillRequiredFieldsAndSubmit: function(subject, email, message) {
        return this
            .setValue("@contactSubject", subject)
            .setValue("@email", email)
            .setValue("@message", message)
            .click("@submitButton");
    },

    captureFailureScreenshot: function(name) {
        const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
        const filename = `screenshots/contactForm_${name}_${timestamp}.png`;
        this.api.saveScreenshot(filename);
    },
}


module.exports = {
    url: "http://automationpractice.multiformis.com/index.php?controller=contact",
    commands: [contactUsPageCommands],
    elements : {
        title: "h1.page-heading",
        contactSubject: "#id_contact",
        email: "#email",
        orderRef: "#id_order",
        message: "#message",
        fileUpload: "#fileUpload",
        submitButton: "#submitMessage",
        successAlert: ".alert.alert-success",
        errorAlert: 'div.alert-danger',
        errorListItem: 'div.alert-danger li'
    },
}
