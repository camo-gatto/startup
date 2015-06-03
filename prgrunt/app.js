'use strict';
var express = require('express');
var app = express();
var path = require('path');

var http = require('http');
var middleware = require('./middleware.js');

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
app.use('/static', express.static('../frontend'));
var server = http.createServer(app);
var io = require('socket.io')(server);
require('./socket.js')(io);

module.exports = {
    server: server

};