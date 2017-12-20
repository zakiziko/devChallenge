/**
 * @author zakaria el messoudi
 */

const express = require('express');
const mongoose =  require('mongoose');
const bodyparser = require('body-parser');
const cors = require('cors');
const config = require('./config/database');
const users = require('./routes/user');
const topics = require('./routes/topic');
const comments = require('./routes/comment');
const passport = require('passport');

/**
 * Just in case of  DeprecationWarning: Mongoose: mpromise (mongoose's default promise library) probleme
 * I used global.Promise before the connections
 * see{@link http://mongoosejs.com/docs/promises.html}
 */
mongoose.Promise = global.Promise;

//database connections
mongoose.connect(config.database,config.options);

var app = express();

//cors middleware
const corsOptions = {
  origin: 'http://localhost:3001',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}
app.use(cors(corsOptions));

//bodyParser middleware
app.use(bodyparser.urlencoded({extended: true}));
app.use(bodyparser.json());


//PassPort middleware
app.use(passport.initialize());
app.use(passport.session());
require('./config/passport')(passport);

//routes middleware
app.use('/users',users);
app.use('/topics',topics);
app.use('/comments',comments);

//the server will be open on port 3000
app.listen(3000);
