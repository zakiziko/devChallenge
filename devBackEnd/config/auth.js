/**
 * the facebook application config needs appId, appSecret and The app callbackUrl that should be validAuth
 * we can have more details about the profile fields in profileFields attribut
 * see how to create facebook application {@link https://developers.facebook.com/docs/apps/register}
 * for more details about facebook-passport {@link https://www.npmjs.com/package/passport-facebook}
 */
module.exports = {
  clientID: '2065785360370348',
  clientSecret : '3c2a5cbc52a418c3e1eba0772ee5d393',
  callbackURL : 'http://localhost:3001/profile',
  enableProof: true
}
