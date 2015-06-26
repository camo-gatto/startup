'use strict';
/**
 * @remove
 * cluster and worker servono solo per i log
 */
var cluster = require('cluster');
var worker = (cluster.worker !== null) ? cluster.worker : {id: process.pid};
var cache = require('./abstract/CacheAbstract');

/**
 * @enum socket event's name
 */
var EVENTUSERSCONNECTED = 'users:connected', EVENTONMESSAGE = 'gatto', EVENTSENDMESSAGE = 'gatto', EVENTJOIN = 'join';

/**
 * @method updateConnectedUsers
 * @todo test
 * @desc emit EVENTUSERSCONNECTED to all connected users
 */
function updateConnectedUsers(cache, io, socket) {
  cache.keys(function (keys) {
    keys.forEach(function (socketId) {
       if(socketId !== socket.id){
         io.to(socketId).emit(EVENTUSERSCONNECTED, socket.request.user);
       }
    });
  });
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
          console.log("disconnect" + 'S:', socket.id + ' W:' + worker.id);
      });

      updateConnectedUsers(cache, tcpServer, socket);
      socket.on(EVENTJOIN, function(data) {
        /** @desc data {user: string, to: string} */
          cache.put(data.user, socket.id);
      });
      socket.on(EVENTONMESSAGE, function(data) {
          console.log('Received on worker ' + worker.id + ' SocketId: ' + socket.id + ' ' + data.user + ': ' +data.message);
          sendTo(cache, tcpServer, data);
      });
  });
}

module.exports = socketWebApp;
