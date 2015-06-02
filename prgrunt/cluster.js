var clc = require('cli-color');
var sticky = require('sticky-session');
var config = require('./conf.json');
if(typeof config.isClustered === "undefined" || config.isClustered === false) {
    require('./app.js').server.listen(3000, serverListener);
    return;
}


// This code will be executed only if isClustered is true
sticky(function() {
  // This code will be executed only in slave workers     
    return require('./app.js').server;
    
}).listen(3000, serverListener);


function serverListener() {
    console.log(clc.green('server started on port 3000, PID: ' + process.pid));
}