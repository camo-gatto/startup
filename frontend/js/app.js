var app = angular.module('chat', ['btford.socket-io']);

app.factory('socket', function(socketFactory) {
    var socket = socketFactory();
    socket.forward();
    return socket;
});

app.controller('chatController', function($scope, socket, $interval, $timeout, $element) {
    $scope.messages = [];
    $scope.send = function() {
        if(angular.isUndefined($scope.message) || $scope.message == null || $scope.message == '') {
            return;
        }
        socket.emit('gatto', {message: $scope.message, user: 'localhost', to: window.sessionStorage.getItem('to')});
        $scope.messages.push($scope.message);
        $scope.message = "";
        $timeout(function() {
            $element.children("#messages").scrollTop($element.children("#messages")[0].scrollHeight);
        });
        
    }
//    $scope.message = "aaa";
//    $interval(function() {$scope.send();}, 500);
    socket.on('gatto', function(message) {
        console.debug('socket-client: ', message);
    });
    
    socket.on('connect', function() {
        console.debug("connect ");
        socket.emit('join', {
            user: window.sessionStorage.getItem('user'),
            to: window.sessionStorage.getItem('to')
        });
    });
    
    socket.on('disconnect', function() {
        console.debug("disconnect ");
    });
    

});
