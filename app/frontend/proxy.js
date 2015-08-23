var express = require('express');
var app = express();

var http = require('http').Server(app);
var io = require('socket.io')(http);

io.on('connection', function(socket) {
    socket.on('gatto', function(msg){
        console.log('message: ' + msg);
        io.emit('gatto', { name: 'everyone' , message: 'hello :-)'});
    });
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});

app.get('/hello', function (req, res) {
  res.send('Hello World!');
});

app.use('/static', express.static('./'));


module.exports = app;
