const mongoose = require('mongoose');
const config = require('../config/database');

const topicSchema = mongoose.Schema({
  name: {type: String, required: true},
  description: {type: String, required: true},
  creationDate:{type:Date,default:Date.now},
  upVote: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  creator: { type: mongoose.Schema.Types.ObjectId, ref: 'User',required: true },
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }]
});

const Topic = module.exports = mongoose.model('Topic',topicSchema);
/**
 * @desc this function push a new comment into comments list of the topic
 * @function
 * @param {json} comment
 * @return  {promise} callback
 */
module.exports.UpdateComments = function(comment,callback){
  const query = {_id: comment.onTopic};
  Topic.findOneAndUpdate(query,
    { $push: { comments: comment }},{new:true},callback);
}
