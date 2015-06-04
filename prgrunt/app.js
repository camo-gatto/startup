'use strict';
var express = require('express');
var app = express();
var path = require('path');

var http = require('http');
var middleware = require('./middleware.js');

var bodyParser = require('body-parser');
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
app.get('/login', function(req, res) {
    res.render('pages/index', {main: '../partials/login'});
});
app.post('/login', function(req, res) {
     /*req.body Contains key-value pairs of data submitted in the request body. By default, it is undefined, and is populated when you use body-parsing middleware such as body-parser and multer.*/
    console.log('/login', req.body);
    res.json(req.body);
});
app.use('/static', express.static('../frontend'));
var server = http.createServer(app);
var io = require('socket.io')(server);
require('./socket.js')(io);

module.exports = {
    server: server

};