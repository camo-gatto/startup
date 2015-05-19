var sticky = require('sticky-session');
 
sticky(function() {
    console.log('process.pid', process.pid);
  // This code will be executed only in slave workers 
    
    return require('./app.js').server;
    
    
}).listen(3000, function() {
    console.log('server started on 3000 port');
});