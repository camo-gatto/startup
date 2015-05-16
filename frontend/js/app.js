var app = angular.module('chat', ['btford.socket-io']);

app.factory('socket', function(socketFactory) {
    var socket = socketFactory();
//    socket.forward();
    return socket;
});

app.controller('chatController', function($scope, socket) {
    $scope.send = function() {
        socket.emit('gatto', $scope.message);
        $scope.message = "";
        return false;
    }
    socket.on('gatto', function(message) {
        console.debug('socket-client: ', message);
    });

});
