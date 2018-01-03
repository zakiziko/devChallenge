/**
 * @desc this module contain our authentification Strategy based on passport-facebook
 * for more about the passport-facebook @see {@link "https://www.npmjs.com/package/passport-facebook"}
 */

const passport = require('passport');
const auth = require('./auth');
const graph = require('fbgraph');
const User = require('../modules/user');
const FacebookStrategy = require('passport-facebook').Strategy;

module.exports = function(passport){

  passport.serializeUser(function(user, done) {
    done(null, user);
  });

  passport.deserializeUser(function(user, done) {
    done(null, user);
  });

  //Use the FacebookStrategy within passport
  passport.use(new FacebookStrategy({
      clientID: auth.clientID,
      clientSecret: auth.clientSecret,
      callbackURL: auth.callbackURL
    },
    function(accessToken, refreshToken, profile, cb) {
      process.nextTick(function(){
        // checking the database if the user already exist
        User.findOne({'id':profile.id},(err,user)=>{
          if(err){
            return cb(err);
          }if(user){
            return cb(null,user);
          }else{
            let newUser = new User();
            /**
             * facebook-passport in sometimes may not be able to get user email back so
             * using the facebook graph api to surpasse this probleme
             * facebook graph api take accessToken and give us back all user data that have permession access true
             * see {@link https://developers.facebook.com/docs/graph-api/}
             */

            graph.setAccessToken(accessToken);
            graph.post(profile.id+"/?fields=id,name,email", function(err, res) {
              if(err)
                throw err;
              else{
                newUser.id = res.id;
                newUser.name = res.name;
                newUser.email =res.email;
                //save the new user into database
                newUser.save(function(err) {
                if (err)
                  throw err;
                // if successful, return the new user
                return cb(null, newUser);
                });
              }
            });
          }
        });
      })

    }
  ));
}
