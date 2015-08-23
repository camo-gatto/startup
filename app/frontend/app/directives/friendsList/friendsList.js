define(['application', 'services/socket.service', 'css!./friendsList.css'], function (application) {

    application.directive('friendsList', function () {
        return {
            restrict: 'E',
            templateUrl: '/static/app/directives/friendsList/friendsList.html',
            scope: {
                ngModel: '='
            },
            controller: function ($scope, socket, $http) {
                var ONFRIEND = "socket:eventname";

                $scope.select = function (friend) {
                    console.log('friend: ', friend);
                    $scope.ngModel = friend;
                }

                /**
                 * todo get the list with HTTP GET METHOD
                 */
                 $http.get('/private/api/userslist').success(function(data, status, headers, config) {
                     $scope.friends = data;
                   }).error(function(data, status, headers, config) {
                       console.error(data);
                   });


                socket.on(ONFRIEND, function(friend) {
                    var f = $scope.friends.find(function (element) {
                        return (element.id === friend.id);
                    });
                    if(f.length > 1) {
                        throw new Error("Users id conflict!");
                    }
                    if(angular.isDefined(f)) {
                        f.online = friend.online;
                    }
                });

            }
        }
    });


});
