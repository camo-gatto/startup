/**
 * @config angular ui-router
 *
 */
angular.module('chat', ['btford.socket-io', 'ui.router']).config(function($stateProvider) {
  $stateProvider
  .state('app', {
    url: '',
    views: {
        'users-connected-list@' : {
            templateUrl: 'static/views/partials/state1.html',
            controller: function ($scope, socket,$http) {

              $http.get('/private/api/userslist').
                success(function(data, status, headers, config) {
                  $scope.users = data;
                }).
                error(function(data, status, headers, config) {

                });
              /**
               * @mock users list
               */

              var EVENTUSERSCONNECTED = 'users:connected';
              socket.on(EVENTUSERSCONNECTED, function (user) {
                console.log(EVENTUSERSCONNECTED,user);
                  $scope.users.push(user)
              });
            }
        },
        'chat@': {
            templateUrl: 'static/views/partials/chat-main.ejs',
            controller: 'chatController'
        }

    }
  })
});
