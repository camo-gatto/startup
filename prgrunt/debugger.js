'use strict';
var clc = require('cli-color');
var sticky = require('sticky-session');
var config = require('./config/conf');
require('./app.js').server.listen(3000, serverListener);
    


// To use default port 80 run node with sudo. es sudo node cluster.js site on http://localhost/login
function serverListener() {
    console.log(clc.green('server started on port 3000, PID: ' + process.pid));
}