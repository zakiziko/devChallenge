const express = require("express");
const Topic = require('../modules/topic');
const User = require('../modules/user');
const Comment = require('../modules/comment');
const bodyParser= require('body-parser');
const router = express.Router();

/**
 * adding a new comment into a Topic
 * @param {json} req.body it's contain the id of the topic commented, comment body and the comment creator
 *@return {json} message the describe the state of the result  
 */
router.post('/',(req,res)=>{
  var Newcomment = new Comment({
    onTopic : req.body.onTopic,
    content : req.body.content,
    creator : req.body.creator
  });
  Newcomment.save(function(err){
    let message = 'Comment saved successful';
    Topic.UpdateComments(Newcomment,function(err){
      if(err)
        message = 'erro updating the topic';
    });
    if(err)
      message = 'err saving the Comment';
    return res.json(message);
  });
});
module.exports = router;
