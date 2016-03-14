var beats = require('./beats');

function applyCustomRestfulAPIs(api) {
    api.use('/api/beats', beats);
}

module.exports = applyCustomRestfulAPIs;
