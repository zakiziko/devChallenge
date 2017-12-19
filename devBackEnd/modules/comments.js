const mongoose = require('mongoose');
const config = require('../config/database');

const commentSchema = mongoose.Schema({
  onTopic : {type: mongoose.Schema.Types.ObjectId, ref: 'Topic'}
  content: String,
  creationDate:{type:Date,default:Date.now},
  creator: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

const Comment = module.exports = mongoose.model('Topic',commentSchema);
