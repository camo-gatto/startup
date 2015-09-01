'use strict';
var express = require('express');
var cnf = require('./config/conf');
var app = express();
var path = require('path');
var http = require('http');
var middleware = require('./middleware.js');
var bodyParser = require('body-parser');
var session = require('express-session');
var passport = require('passport');
var cookieParser = require('cookie-parser');
//require('./config/passport')(passport);

app.use(session(
  {
    key: 'connect.sid',
    store: require('./arch/redisArch').redisStore,
    secret: cnf.session.secret,
    resave: true,
    cookie:  {maxAge: cnf.session.expiration},
    saveUninitialized:true
  }
));

var mongoose = require('mongoose');
var mongoOptions = {
  user: cnf.mongo.user,
  pass: cnf.mongo.password
}

var mongoUri="mongodb://"+cnf.mongo.host+":"+cnf.mongo.port+"/"+cnf.mongo.dbname;
mongoose.connect(mongoUri, mongoOptions);


app.use(cookieParser());
 // persistent login sessions


require('./arch/loginStrategy')(passport);

app.use(passport.initialize());
app.use(passport.session());


app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({extended: true}));

app.use('/', middleware);
require('./routes/auth')(app,passport);
var api = require('./routes/api');
app.use('/private/api',api.api);
app.set('view engine', 'ejs');
app.set('views', path.resolve('../frontend/views'));
app.get('/postlogin/chat', function(req, res) {
    res.render('pages/index', {main: '../partials/chat-main'});
});

app.get('/ejs', function(req, res) {
    res.render('pages/index', {main: '../partials/main'});
});

app.get('/postlogin', function(req, res) {
    res.render('pages/index', {main: '../partials/postlogin'});
});



app.use('/static', express.static('../frontend'));
var server = http.createServer(app);


require('./socket.js')(server);
module.exports = {
  server: server,
  app:app
};
