const mongoose = require('mongoose');
const config = require('../config/database');

const commentSchema = mongoose.Schema({
  onTopic : {type: mongoose.Schema.Types.ObjectId, ref: 'Topic', required:true},
  content: {type: String, required:true},
  creationDate:{type:Date,default:Date.now},
  creator: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required : true }
});

const Comment = module.exports = mongoose.model('Comment',commentSchema);
