'use strict';
var cluster = require('cluster');
var worker = cluster.worker;

if (worker === null) {
    worker = {id: process.pid};
}

var clients = {}, numClients = 1;
module.exports = function (io) {
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
    
};

