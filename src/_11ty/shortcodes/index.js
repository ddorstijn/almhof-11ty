const image = require('./image');

module.exports = function (config) {
    config.addNunjucksAsyncShortcode('image', image);
};