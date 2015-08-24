define(['application', 'services/socket.service', 'css!./chat.css'], function (application) {

    /**
     * @todo ng-repeat animation: http://www.nganimate.org/angularjs/ng-repeat/move
     */

    application.directive('chat', function() {
        return {
            restrict: 'E',
            templateUrl: '/static/app/directives/chat/chat.html',
            scope: {
            },
            controller: function ($scope, socket, $interval, $timeout, $element) {
                $scope.messages = [];

                $scope.me = {
                    name: "john",
                    lastname: "sad",
                    profile: "/static/app/resources/friends/128.jpg",
                    online: true
                }
                function scroll() {
                    $timeout(function() {
                        angular.element("#messages").scrollTop($element.children("#messages")[0].scrollHeight);
                    });
                }
                $scope.send = function() {
                    if(angular.isUndefined($scope.message) || $scope.message == null || $scope.message == '') {
                        return;
                    }

                    socket.emit('gatto', {message: $scope.message, user: window.sessionStorage.getItem('me'), to: window.sessionStorage.getItem('to')});

                    $scope.messages.push({
                        name: $scope.me.name,
                        message: $scope.message
                    });
                    $scope.message = "";
                    scroll();
                }

                $scope.signout = function() {
                    socket.disconnect();
                }

                $scope.signin = function() {
                    socket.connect();
                }

                socket.on('gatto', function(message) {
                    $scope.messages.push(message);
                    scroll();
                    console.log('socket-client: ', message);
                });

                socket.on('connect', function() {
                    $scope.me.online = true;
                    console.debug("connect ");
                    socket.emit('join', {
                        user: window.sessionStorage.getItem('me'),
                        to: window.sessionStorage.getItem('to')
                    });
                });

                socket.on('disconnect', function() {
                    $scope.me.online = false;
                    console.debug("disconnect ");
                });
            }
        }


    });
});
