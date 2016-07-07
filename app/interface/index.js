var beats = require('./beats');
var user = require('./user');
var cachegoose = require('cachegoose');

function applyCustomRestfulAPIs(api) {
    api.use('/api/beats', beats);
    api.use('/api/user', user);

    api.get('/api/evictCache', function (req, res) {
        cachegoose._cache.clear();
        res.sendStatus(200);
    });
}

module.exports = applyCustomRestfulAPIs;
