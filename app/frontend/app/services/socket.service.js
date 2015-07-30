angular.module('chat').factory('socket', function(socketFactory) {
    var socket = socketFactory();
    socket.forward();
    return socket;
});