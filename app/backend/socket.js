'use strict';
/**
 * @remove
 * cluster and worker servono solo per i log
 */
var cluster = require('cluster');
var worker = (cluster.worker !== null) ? cluster.worker : {id: process.pid};
var cache = require('./abstract/CacheAbstract');
var User = require('./models/userData');

/**
 * @enum socket event's name
 */
var EVENTUSERSCONNECTED = 'users:connected', EVENTONMESSAGE = 'gatto', EVENTSENDMESSAGE = 'gatto', EVENTJOIN = 'join', CONNECTEDUSER = 'connected-user:';


/**
 * @method sendTo
 * @desc send data to user
 */
function sendTo(cache, io, data,socketid) {
  // cache.get(data.to, function(socketId) {
  //   console.log('to - sockedId: ', socketId);
  //   io.to(socketId).emit(EVENTSENDMESSAGE, data.message);
  // });
  console.log('to - sockedId: ', data.to);
  var response={
    name:data.user.name,
    message:data.message,
    socket:socketid
  };
  io.to(data.to).emit(EVENTSENDMESSAGE, response);
}

/** @desc tcpServer is io */
function socketWebApp(tcpServer) {
  tcpServer.on('connection', function(socket) {
      console.log('connection' + 'S:', socket.id + ' W:' + worker.id);
      console.log("*********************************************************************************************");
      console.log(socket.request.user);
      console.log("*********************************************************************************************");
      socket.on('disconnect', function() {
          cache.remove(CONNECTEDUSER + socket.id);
          console.log("disconnect" + 'S:', socket.id + ' W:' + worker.id);
      });


      socket.on(EVENTJOIN, function(data) {
        /** @desc data {user: string, to: string} */
          var user=new User(socket.request.user, socket.id)
          console.log(user);
          cache.put(CONNECTEDUSER + socket.id, JSON.stringify(user));
          socket.broadcast.emit(EVENTUSERSCONNECTED, user);
      });
      socket.on(EVENTONMESSAGE, function(data) {
          console.log('Received on worker ' + worker.id + ' SocketId: ' + socket.id + ' ' + data.user + ': ' +data.message);
          sendTo(cache, tcpServer, data,socket.id);
      });
  });
}

module.exports = socketWebApp;
