var bodyParser = require('body-parser');
var cors = require('cors');

var express = require('express');
var passport = require('passport');
var mongoose = require('mongoose');
var path = require('path');

var index = require('./routes/index');
var news = require('./routes/news');
var auth = require('./routes/auth');

var app = express();
//init main.js(mongoose)
var config = require('./config/config.json');
require('./models/main.js').connect(config.mongoDbUri);

// view engine setup
app.set('views', path.join(__dirname, '../client/build/'));
app.set('view engine', 'jade');
app.use('/static', express.static(path.join(__dirname, '../client/build/static/')));

// TODO: remove this after development is done
app.use(cors());
//JS是react server给的，但是调用的api放在node server
//不是一个源，初次配置，浏览器会deny这么做-->need a header match所有（‘*’）
// app.all('*', function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "X-Requested-With");
//   next();//调用next()被下面的两个app.use()重新match
// });
app.use(bodyParser.json());

// load passport strategies
app.use(passport.initialize());
var localSignupStrategy = require('./passport/signup_passport');
var localLoginStrategy = require('./passport/login_passport');
passport.use('local-signup', localSignupStrategy);
passport.use('local-login', localLoginStrategy);

// pass the authenticaion checker middleware
const authCheckMiddleware = require('./middleware/auth_checker');
app.use('/news', authCheckMiddleware);

app.use('/', index);
app.use('/news', news);
app.use('/auth', auth);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  res.render('404 Not Found');
});

module.exports = app;
