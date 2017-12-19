const express = require("express");
const User = require('../modules/user');
const passport = require('passport');
const router = express.Router();

/**
 * @description asking facebook authentication. facebook  will send the accessToken into the callbackUrl app Config
 */
router.get('/auth/facebook',
  passport.authenticate('facebook',{authType: 'rerequest',scope: 'email'}));

/**
 * the frontEnd App will send the accessToken to this function to deserialize it to json object
 *@return {json}
 */
router.get('/auth/facebook/callback',
  passport.authenticate('facebook'),
  function(req, res) {
    // Successful authentication
    res.json({"user":req.user});
});

module.exports = router;
