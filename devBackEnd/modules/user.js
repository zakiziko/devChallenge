const mongoose = require('mongoose');
const config = require('../config/database');
const userSchema = mongoose.Schema({
  id : String,
  name: String,
  email: String
});
const User = module.exports = mongoose.model('User',userSchema);
