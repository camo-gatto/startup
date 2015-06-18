'use strict';
var cluster = require('cluster');
var worker = cluster.worker;

if (worker === null) {
    worker = {id: process.pid};
}

var map = {};


module.exports = function (io) {
    io.on('connection', function(socket) {
        console.log('connection' + 'S:', socket.id + ' W:' + worker.id);
        socket.on('disconnect', function() {
            console.log("disconnect" + 'S:', socket.id + ' W:' + worker.id);
        });

        socket.on('join', function(data) {
            console.log('join ' + data.user + ' ' + data.to);
            map[data.user] = {socketId: socket.id};
        });
        socket.on('gatto', function(data) {
            console.log('Received on worker ' + worker.id + ' SocketId: ' + socket.id + ' ' + data.user + ': ' +data.message);
            //io.emit('gatto', message);
            if(map[data.to] && map[data.to].socketId){
                io.sockets.connected[map[data.to].socketId].emit('gatto', data.message);
            }
        });
    });
    
};

