var mongoose = require('mongoose');

function TagModel() {
  'use strict';
  var tagSchema = new mongoose.Schema({
    name: {type: String},
    class: {type: String}

  });
  return mongoose.model('tag', tagSchema);
}

module.exports = TagModel();

