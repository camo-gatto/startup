var express = require('express');
var app = express();
var http = require('http');
var path = require('path');
var cluster = require('cluster');
var worker = cluster.worker;

app.get('/chat', function(req, res) {
    res.sendFile(path.resolve('../frontend/chat.html'));
});
app.use('/static', express.static('../frontend'));

//    var sticky = require('sticky-session');
var PORT = 3000;
var server = http.Server(app).listen(PORT);



var io = require('socket.io')(server);
io.on('connection', function(socket) {
    console.log('An user connected on port: ' + PORT + ' worker:' + worker.id + ' SocketId: ' + socket.id);
    socket.on('disconnect', function() {
        console.log("An user disconnected from worker"  + worker.id + ' SocketId: ' + socket.id);
    });

    socket.on('gatto', function(msg) {
        console.log('Received on worker ' + worker.id + ' SocketId: ' + socket.id + ' message: ' + msg);
        io.emit('gatto', msg);
    });
});