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
 * @method updateConnectedUsers
 * @todo keys contiene tutte le chiavi salvate in cache. recuperare la socket id e lanciare un event: EVENTUSERSCONNECTED
 * @desc emit EVENTUSERSCONNECTED to all connected users
 */
function updateConnectedUsers(io, socket) {
  socket.broadcast.emit(EVENTUSERSCONNECTED, socket.request.user);

}

/**
 * @method sendTo
 * @desc send data to user
 */
function sendTo(cache, io, data) {
  cache.get(data.to, function(socketId) {
    console.log('to - sockedId: ', socketId);
    io.to(socketId).emit(EVENTSENDMESSAGE, data.message);
  });
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
          updateConnectedUsers(tcpServer, socket);
      });
      socket.on(EVENTONMESSAGE, function(data) {
          console.log('Received on worker ' + worker.id + ' SocketId: ' + socket.id + ' ' + data.user + ': ' +data.message);
          sendTo(cache, tcpServer, data);
      });
  });
}

module.exports = socketWebApp;
