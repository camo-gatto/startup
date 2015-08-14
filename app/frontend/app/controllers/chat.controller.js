define(['services/socket.service'], function () {
    angular.module('chat').controller('chatController', function($scope, socket, $interval, $timeout, $element) {
        $scope.messages = [];
        $scope.name = "";
        $scope.send = function() {
            if(angular.isUndefined($scope.message) || $scope.message == null || $scope.message == '') {
                return;
            }
            socket.emit('gatto', {message: $scope.message, user: window.sessionStorage.getItem('me'), to: window.sessionStorage.getItem('to')});
            $scope.name = window.sessionStorage.getItem('me');
            $scope.messages.push({
                name: window.sessionStorage.getItem('me'),
                message: $scope.message
            });
            $scope.message = "";

            $timeout(function() {
                angular.element("#messages").scrollTop($element.children("#messages")[0].scrollHeight);
            });

        }

        $scope.signout = function() {
            socket.disconnect();
        }

        $scope.signin = function() {
            socket.connect();
        }

        socket.on('gatto', function(message) {
            $scope.messages.push({
                name:window.sessionStorage.getItem('to'),
                message:message
            });
            console.debug('socket-client: ', message);
        });

        socket.on('connect', function() {
            console.debug("connect ");
            socket.emit('join', {
                user: window.sessionStorage.getItem('me'),
                to: window.sessionStorage.getItem('to')
            });
        });

        socket.on('disconnect', function() {
            console.debug("disconnect ");
        });


    });
});
