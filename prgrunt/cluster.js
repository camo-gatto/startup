var sticky = require('sticky-session');
 
sticky(function() {
    console.log('process.pid', process.pid)
  // This code will be executed only in slave workers 
    var express = require('express');
    var app = express();
    var path = require('path');
    var cluster = require('cluster');
    var worker = cluster.worker;
    var http = require('http');
    
    app.get('/chat', function(req, res) {
        res.sendFile(path.resolve('../frontend/chat.html'));
    });
    app.use('/static', express.static('../frontend'));
    
    
    var server = http.createServer(app);
    var io = require('socket.io')(server);
    io.on('connection', function(socket) {
        console.log('connection' + 'S:', socket.id + ' W:' + worker.id);
        socket.on('disconnect', function() {
            console.log("disconnect" + 'S:', socket.id + ' W:' + worker.id);
        });
        socket.on('gatto', function(message) {
            console.log('Received on worker ' + worker.id + ' SocketId: ' + socket.id + ' ' + message.user + ': ' +message.message);
            io.emit('gatto', message);
        });
    });
    return server;
}).listen(3000, function() {
    console.log('server started on 3000 port');
});