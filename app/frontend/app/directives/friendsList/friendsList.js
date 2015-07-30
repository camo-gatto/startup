angular.module('chat').directive('friendsList', friendsList);

function friendsList() {
    return {
        restrict: 'E',
        template: './friendsList.html',
        scope: {},
        controller: function ($scope, socket) {
            var ONFRIEND = "socket:eventname";
            /**
             * todo get the list with HTTP GET METHOD
             */
            $scope.friends = [
                {name: "john", lastname: "sad", profile: "", online: true},
                {name: "Maya", lastname: "sadsad", profile: "", online: true},
                {name: "Lisa", lastname: "sad", profile: "", online: false}
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
