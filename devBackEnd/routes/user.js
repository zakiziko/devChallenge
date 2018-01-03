const express = require("express");
const User = require('../modules/user');
const passport = require('passport');
const router = express.Router();

/**
 * @description asking facebook authentication. facebook  will send the accessToken into the callbackUrl in the app Config
 * and here we are using the facebook passport strategy for more @see {@link "https://www.npmjs.com/package/passport-facebook"}
 */
router.get('/',
  passport.authenticate('facebook',{authType: 'rerequest',scope: 'email'}));

/**
 * @description the frontEnd App will send the accessToken to this function to deserialize it to json object
 * that have the user data
 *@return {json}
 */
router.get('/auth',
  passport.authenticate('facebook'),
  function(req, res) {
    // Successful authentication
    res.json({"user":req.user});
});

module.exports = router;
