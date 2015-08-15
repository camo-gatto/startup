define([], function () {


    angular.module('chat').config(function($stateProvider) {
      $stateProvider
      .state('app', {
        url: '',
        views: {
            'users-connected-list@' : {
                templateUrl: 'static/views/partials/state1.html',
            },
            'chat@': {
                template: '<chat></chat>'
            }

        }
      })


    });

});
