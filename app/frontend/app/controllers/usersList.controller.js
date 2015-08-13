define(['services/socket.service', 'btford.socket-io'], function () {

    angular.module('chat').controller('userslist', function ($scope, socket, $http) {

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
    });


});
