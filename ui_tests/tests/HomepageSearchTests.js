const selectors = require("../page-objects/HomepageSearch").selectors;
const testData = require("../page-objects/HomepageSearch").testData;

module.exports = {
    before: function(browser) {
        browser.url("http://automationpractice.multiformis.com/index.php");
    },

    after: function(browser) {
        browser.end();
    },

    'Search for "dress" on homepage and verify results': function (browser) {
        browser
        .setValue(selectors.searchInput, testData[0].searchTerm)
        .click(selectors.searchButton)
        .waitForElementVisible(selectors.searchResults, 5000)
        .elements('css selector', '.product_list > li', function (res) {
            const count = res.value.length;

            for (let i = 1; i <= count; i++) {
            const selector = `.product_list > li:nth-child(${i}) .product-name`;

            browser.getText(selector, function (textRes) {
                const productText = textRes.value.toLowerCase();

                if (!productText.includes('dress')) {
                    console.warn(`⚠ Not matched: "${productText}"`);
                    browser.assert.ok(false, `⚠ Not matched: "${productText}"`);
                } 
                else {
                    browser.assert.ok(true, `✅ Matched: "${productText}" contains "dress"`);
                }
            });
            }
        })
    }
};
