const prettyDate = require('./prettydate');

module.exports = function (config) {
    config.addFilter('datefmt', (contentDate) => prettyDate(contentDate));
};