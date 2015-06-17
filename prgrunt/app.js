'use strict';
var express = require('express');
var cnf = require('./config/conf');
var app = express();
var path = require('path');

var http = require('http');
var middleware = require('./middleware.js');


var bodyParser = require('body-parser');
var session= require('express-session');
var passport = require('passport');
require('./config/passport')(passport);

app.use(session({
        secret: 'camogatto',
        resave: true,
        saveUninitialized:true
    }));
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
var mongoose = require('mongoose');
mongoose.connect(cnf.mongo.dbname);
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({extended: true}));
app.use('/', middleware);
app.set('view engine', 'ejs');
app.set('views', path.resolve('../frontend/views'));
app.get('/chat', function(req, res) {
//    res.sendFile(path.resolve('../frontend/chat.html'));
    res.render('pages/index', {main: '../partials/chat-main'});
});

app.get('/ejs', function(req, res) {
    res.render('pages/index', {main: '../partials/main'});
});

require('./routes/auth')(app,passport);

app.use('/static', express.static('../frontend'));
var server = http.createServer(app);
var io = require('socket.io')(server);
require('./socket.js')(io);

module.exports = {
    server: server

};