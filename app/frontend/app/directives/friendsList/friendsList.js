define(['services/socket.service'], function () {

    angular.module('chat').directive('friendsList', friendsList);

    function friendsList() {
        return {
            restrict: 'E',
            templateUrl: 'static/app/directives/friendsList/friendsList.html',
            scope: {},
            controller: function ($scope, socket) {
                var ONFRIEND = "socket:eventname";

                $scope.select = function (friend) {
                    console.log('friend: ', friend);
                }

                /**
                 * todo get the list with HTTP GET METHOD
                 */
                $scope.friends = [
                    {name: "john", lastname: "sad", profile: "static/app/resources/friends/128.jpg", online: true},
                    {name: "Maya", lastname: "sadsad", profile: "static/app/resources/friends/129.jpg", online: false},
                    {name: "Lisa", lastname: "sad", profile: "static/app/resources/friends/130.jpg", online: false},
                    {name: "Irwin", lastname: "Mueller", profile: "static/app/resources/friends/131.jpg", online: true}
                ];

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
    }
});
