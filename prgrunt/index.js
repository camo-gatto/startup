var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/chat.html');
});

io.on('connection', function(socket) {
    console.log('a user connected');
    socket.on('disconnect', function() {
        console.log('user disconnected');
    });
    
    socket.on('gatto', function(msg) {
        console.log('message: ' + msg);
    });
});

app.use('/static', express.static('../frontend'));





http.listen(3000, function() {
    console.log('listening on http://localhost:3000');
});