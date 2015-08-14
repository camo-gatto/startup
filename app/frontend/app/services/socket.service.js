define([], function () {

    angular.module('chat').factory('socket', ['socketFactory', function(socketFactory) {
        var socket = socketFactory();
        socket.forward();
        return socket;
    }]);



});
