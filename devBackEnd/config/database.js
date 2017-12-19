/**
 * this is the mongodb database config see {@link http://mongoosejs.com/docs/connections.html}
 */
module.exports = {
  database:'mongodb://localhost:27017/facebookAuth',
  secret : 'secret',
  options : {
  useMongoClient: true,
  poolSize: 10, // Maintain up to 10 socket connections
  // If not connected, return errors immediately rather than waiting for reconnect
  bufferMaxEntries: 0
  }
}
