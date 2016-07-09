var userModel = require('./user/model');
var beatModel = require('./beat/model');
var topicModel = require('./topic/model');
var linksModel = require('./links/model');
var tagModel = require('./tag/model');

function Models() {
  var models = {
    user: userModel,
    beat: beatModel,
    topic: topicModel,
    links: linksModel,
    tag: tagModel
  };

  return {
    getAll: getAll,
    get: getOne
  }

  function getAll() {
    return models;
  }

  function getOne(name) {
    return models[name];
  }


}

module.exports = Models();
