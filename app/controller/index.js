var beats = require('./beats');

function applyControllers(api) {
  api.use('/api/beats', beats);
}

module.exports = applyControllers;
