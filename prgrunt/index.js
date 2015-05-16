var express = require('express');
var app = express();
var http = require('http');
var path = require('path');
var numCPUS = require('os').cpus().length;
var cluster = require('cluster');
var properties = require('./conf.json');

if(cluster.isMaster) {
    var workers = properties.node.cluster.workers;
    for(var i = 0; i < workers; i++) {
        var w = cluster.fork();
        console.log("Master fork worker: " + w.id);
    }
    cluster.on('exit', function(worker, code, signal) {
        console.log('worker ' + worker.process.pid + ' died');
    });
    cluster.on('listening', function(worker, address) {
        console.log("Worker:" + worker.id+ " is now connected to " + address.address + ":" + address.port);
    });
    cluster.on('disconnect', function(worker) {
        console.log("The worker #" + worker.id + ' has disconnected');
    });

} else if(cluster.isWorker) {
    
    app.get('/chat', function(req, res) {
        console.log('/chat ', PORT);
        res.sendFile(path.resolve('../frontend/chat.html'));
    });
    app.use('/static', express.static('../frontend'));
    
    var sticky = require('sticky-session');
    var PORT = 3000;
    var server = http.Server(app).listen(PORT);
    
    
    
    var io = require('socket.io')(server);
    io.on('connection', function(socket) {
        console.log('A user connected on port: ' + PORT + ' worker:' + cluster.worker.id);
        socket.on('disconnect', function() {
            console.log("user disconnected from worker"  + cluster.worker.id);
        });
    
        socket.on('gatto', function(msg) {
            console.log('Received on worker ' + cluster.worker.id + ' message: ' + msg);
            io.emit('gatto', msg);
        });
    });
}