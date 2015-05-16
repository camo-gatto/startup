var numCPUS = require('os').cpus().length;
var cluster = require('cluster');
var properties = require('./conf.json');

cluster.setupMaster({exec: 'worker.js'});



if(cluster.isMaster) {
    var workers = properties.node.cluster.workers;
    for(var i = 0; i < workers; i++) {
        var w = cluster.fork();
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

}