var beats = require('./beats');
var user = require('./user');

function applyCustomRestfulAPIs(api) {
    api.use('/api/beats', beats);
    api.use('/api/user', user);

}

module.exports = applyCustomRestfulAPIs;
