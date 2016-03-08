var beats = require('./beats');

function applyControllers(api) {
  api.use('/beats', beats);
}

module.exports = applyControllers;
