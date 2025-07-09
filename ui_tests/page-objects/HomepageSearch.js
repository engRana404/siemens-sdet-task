const HomepageSearchCommands = {
    searchForProduct: function(searchTerm) {
        return this
            .setValue('@searchInput', searchTerm)
            .click('@searchButton')
            .waitForElementVisible('@searchResults', 5000);
    }
};

module.exports = {
    url: "http://automationpractice.multiformis.com/index.php",
    commands: [HomepageSearchCommands],
    elements: {
        searchInput: 'input[name="search_query"]',
        searchButton: 'button[name="submit_search"]',
        searchResults: '#center_column',
        productsList: '.product_list > li',
        productName: '.product-name'
    }
};

    
