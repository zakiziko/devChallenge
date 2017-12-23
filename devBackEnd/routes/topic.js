/**
 * @description this fill will hundell all our topic Rest api
 */
const express = require("express");
const Topic = require('../modules/topic');
const User = require('../modules/user');
const Comment = require('../modules/comment');
const bodyParser= require('body-parser');
const router = express.Router();

/**
 * get all Topics Sorted by date of creation
 */
router.get('/all',(req,res)=>{
  Topic
  .find({})
  .sort({creationDate:-1})
  .populate('creator')
  .exec((err,topics)=>{
    if(err) return res.json({"message":"error Searching Topics"});
    res.json(topics);
  })
})

/**
 * create a new tpoic based on json object passed in using body parser
 *@return {json}
 */
router.post('/add',(req,res)=>{
  var topic = new Topic({
    name : req.body.name,
    description:req.body.description,
    upVote:[],
    creator : req.body.creator
  });
  topic.save(function(err){
    let message = 'Topic saved successful';
    if(err) message = 'err saving the Topic';
    return res.json(message);
  });
});

/**
 * updating the upVote list on a specifique topic
 *@param {String} id topic ID
 *@return {json} message
 */
router.put('/upVote/:id',(req,res)=>{
  const query = { _id: req.params.id };
  var UpVoteUser = new User({
    _id : req.body._id
  });
  Topic.update(query,{ $addToSet: { upVote: UpVoteUser }},
    function(err,callback){
      let message = {state:true,msg:'seccess'};
      if(err){
        message = {state:false,msg:'something went wrong with your topic Id'};
      }else{
        if(callback.nModified === 0){
          message =  {state:false,msg:'You Already UpVote this Topic'};
        }
      }
      res.json(message);
    });

});


module.exports = router;
