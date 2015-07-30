'use strict';
var clc = require('cli-color');
var sticky = require('sticky-session');
var config = require('./config/conf');
require('./app.js').server.listen(config.node.port, serverListener);



// To use default port 80 run node with sudo. es sudo node cluster.js site on http://localhost/login
function serverListener() {
    console.log(clc.green('server started on port '+config.node.port+', PID: ' + process.pid));
}
