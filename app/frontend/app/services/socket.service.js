define(['btford.socket-io'], function () {

    angular.module('chat').factory('socket', function(socketFactory) {
        var socket = socketFactory();
        socket.forward();
        return socket;
    });



});
