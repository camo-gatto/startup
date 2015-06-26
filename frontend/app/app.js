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
            controller: function ($scope, socket) {
              /**
               * @mock users list
               */
              $scope.users = [{name: 'Maya', lastname: 'Simpson'}, {name: 'Mia', lastname: 'Losannna'}];
              var EVENTUSERSCONNECTED = 'users:connected';
              socket.on(EVENTUSERSCONNECTED, function (user) {
                console.log(EVENTUSERSCONNECTED);
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
