var mongoose = require('mongoose');

function UserModel() {
  'use strict';
  const topicSchema = new mongoose.Schema({
    title: {type: String},
    summary: {type: String},
    content: {type: String},
    viewCount: {type: Number,default:0},
    commentCount:{type: Number,default:0},
    likeCount:{type: Number,default:0},
    featured: {type: Boolean,default:false},
    display: {type: Boolean, default: true},
    thumbnail:{type:String,default:null},
    createdAt:{type:Date,default:new Date()}
  });

  return mongoose.model('topic', topicSchema);
}

module.exports = UserModel();

