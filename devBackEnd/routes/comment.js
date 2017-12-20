const express = require("express");
const Topic = require('../modules/topic');
const User = require('../modules/user');
const Comment = require('../modules/comment');
const bodyParser= require('body-parser');
const router = express.Router();

router.post('/add',(req,res)=>{
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
