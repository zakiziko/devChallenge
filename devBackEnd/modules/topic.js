const mongoose = require('mongoose');
const config = require('../config/database');

const topicSchema = mongoose.Schema({
  name: String,
  description: String,
  creationDate:{type:Date,default:Date.now},
  upVote: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  creator: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

const Topic = module.exports = mongoose.model('Topic',topicSchema);
