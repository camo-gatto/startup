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

function cleanCache() {
    var cache = require('./arch/abstract/CacheAbstract');
    cache.removeKeys('connected-user*').then(function () {
        process.kill();
    });
}


process.on('SIGINT', function () {
    console.log("Server shutdown manually - cleaning redis cache.");
    cleanCache();
});

process.on('uncaughtException',function () {
  console.log("Server shutdown for error - cleaning redis cache.");
  cleanCache();
});
