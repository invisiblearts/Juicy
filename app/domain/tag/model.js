var mongoose = require('mongoose');

function TagModel() {
  'use strict';
  var tagSchema = new mongoose.Schema({
    name: {type: String,index: { unique: true }},
    class: {type: String}

  });
  return mongoose.model('tag', tagSchema);
}

module.exports = TagModel();

