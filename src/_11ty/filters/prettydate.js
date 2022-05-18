const { format } = require('date-fns');

module.exports = (contentDate) => {
    return format(contentDate, 'LLL do, yyyy')
}