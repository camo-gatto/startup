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
var cookieParser = require('cookie-parser');
var redis =require("redis");
var redisStore = require('connect-redis')(session);
require('./config/passport')(passport);

var client = redis.createClient();
app.use(session({
        store: new redisStore({ host: cnf.redis.host, port:cnf.redis.port, client: client }),
        secret: 'camogatto',
        resave: true,
        saveUninitialized:true
}));


app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
var mongoose = require('mongoose');
mongoose.connect(cnf.mongo.dbname);
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({extended: true}));
app.use('/', middleware);
var api=require('./routes/api');
app.use('/private/api',api.api);

app.set('view engine', 'ejs');
app.set('views', path.resolve('../frontend/views'));
app.get('/postlogin/chat', function(req, res) {

//    res.sendFile(path.resolve('../frontend/chat.html'));
    res.render('pages/index', {main: '../partials/chat-main'});
});

app.get('/ejs', function(req, res) {
    res.render('pages/index', {main: '../partials/main'});
});

app.get('/postlogin', function(req, res) {
    res.render('pages/index', {main: '../partials/postlogin'});
});

require('./routes/auth')(app,passport);

app.use('/static', express.static('../frontend'));
var server = http.createServer(app);
var io = require('socket.io')(server);

var passportSocketIo = require('passport.socketio');

io.use(passportSocketIo.authorize({
    cookieParser: cookieParser,
    key: 'connect.sid',
    secret: 'camogatto',
    store:new redisStore({ host: cnf.redis.host, port:cnf.redis.port, client: client }),
    fail : function(data, message, error, accept) {
        if(error){
            throw new Error(message);
        }
        console.log("Passport not autorize"); accept(); },
    success: function(data, accept) {

        // console.log("Passport autorize",data); 
        accept(); }
}));



var redis = require('redis');
var redisAdapter = require('socket.io-redis');

var pub = redis.createClient(cnf.redis.port, cnf.redis.host, {detect_buffers: true});
var sub = redis.createClient(cnf.redis.port, cnf.redis.host, {detect_buffers: true});

io.adapter(redisAdapter({pubClient: pub, subClient: sub}));
require('./socket.js')(io);

module.exports = {
    server: server

};
