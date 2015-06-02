var express = require('express');
var app = express();
var path = require('path');
var cluster = require('cluster');
var worker = cluster.worker;
var http = require('http');
var middleware = require('./middleware.js');
if (worker === null) {
    worker = {id: process.pid};
}
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
var clients = {}, numClients = 1;
var server = http.createServer(app);
var io = require('socket.io')(server);
io.on('connection', function(socket) {
    clients[numClients] = socket.id;
    numClients = numClients + 1;
    console.log('connection' + 'S:', socket.id + ' W:' + worker.id);
    socket.on('disconnect', function() {
        console.log("disconnect" + 'S:', socket.id + ' W:' + worker.id);
    });
    
    socket.on('join', function(data) {
        console.log('join ' + data.user + ' ' + data.to);
        clients[data.user] = socket.id;
    });
    socket.on('gatto', function(message) {
        console.log('Received on worker ' + worker.id + ' SocketId: ' + socket.id + ' ' + message.user + ': ' +message.message);
        //io.emit('gatto', message);
        io.sockets.connected[clients[message.to]].emit('gatto', message);
    });
});

module.exports = {
    server: server

};