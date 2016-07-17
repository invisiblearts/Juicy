var mongoose = require('mongoose');
var Tag = [require('../tag/model').schema];

function UserModel() {
  'use strict';
  var topicSchema = new mongoose.Schema({
    title: {type: String},
    summary: {type: String},
    content: {type: String},
    viewCount: {type: Number,default:0},
    commentCount:{type: Number,default:0},
    likeCount:{type: Number,default:0},
    featured: {type: Boolean,default:false},
    display: {type: Boolean, default: true},
    thumbnail:{type:String,default:null},
    createdAt:{type:Date,default:new Date()},
    tags: [{ type: mongoose.Schema.Types.ObjectId, ref: 'tag' }],
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'comment' }],
    staticType:{type:String,default:null}
  });
  return mongoose.model('topic', topicSchema);
}

module.exports = UserModel();

