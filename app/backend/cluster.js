'use strict';
var clc = require('cli-color');
var sticky = require('sticky-session');
var config = require('./config/conf');
if(typeof config.node.isClustered === "undefined" || config.node.isClustered === false) {
    require('./app.js').server.listen(config.node.port, serverListener);
    return;
}


// This code will be executed only if isClustered is true
sticky(function() {
  // This code will be executed only in slave workers
    return require('./app.js').server;

}).listen(config.node.port, serverListener);

// To use default port 80 run node with sudo. es sudo node cluster.js site on http://localhost/login
function serverListener() {
    console.log(clc.green('server started on port '+config.node.port+', PID: ' + process.pid));
}



process.on('SIGINT', function () {
    console.log(clc.red.bold.underline("Soft shutdown PID:  " + process.pid));
    var cache = require('./arch/abstract/CacheAbstract');
    var cluster = require('cluster');
    if(cluster.isMaster) {
        cache.removeKeys('connected-user*', function () {
            console.log(clc.red.bold('CLEANING REDIS CACHE PID:  ' + process.pid));
            process.kill(0);

        });

    }


});
