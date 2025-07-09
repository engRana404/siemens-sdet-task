const HomepageSearchData = require('../test_data/HomepageSearchData');

module.exports = {
    before: function(browser) {
        this.homepageSearch = browser.page.HomepageSearch();
        this.homepageSearch.navigate();
    },

    after: function(browser) {
        browser.end();
    },

    'Search for keyword on homepage and verify results': function (browser) {
        const searchTerm = HomepageSearchData.searchTerm;
        console.log(`Searching for: "${searchTerm}"`);

        this.homepageSearch.searchForProduct(searchTerm);

        this.homepageSearch.api.elements('css selector', '@productsList', function (res) {
            const count = res.value.length;
            console.log(`Found ${count} search results for: "${searchTerm}"`);
            if (count === 0) {
                this.homepageSearch.assert.fail(`No search results found for: "${searchTerm}"`);
            }

            for (let i = 1; i <= count; i++) {
                const selector = `.product_list > li:nth-child(${i}) .product-name`;

                browser.getText(selector, function (textRes) {
                    const productText = textRes.value.toLowerCase();

                    if (!productText.includes(searchTerm.toLowerCase())) {
                        console.warn(`⚠ Not matched: "${productText}"`);
                        browser.assert.ok(false, `⚠ Not matched: "${productText}"`);
                    } else {
                        browser.assert.ok(true, `✅ Matched: "${productText}" contains "${searchTerm}"`);
                    }
                });
            }
        });
    }
};
