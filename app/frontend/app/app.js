define([], function () {

    /**
     * @config angular ui-router
     *
     */
    angular.module('chat', ['ui.router']).config(function($stateProvider) {
      $stateProvider
      .state('app', {
        url: '',
        views: {
            'users-connected-list@' : {
                templateUrl: 'static/views/partials/state1.html',
                controller: ''
            },
            'chat@': {
                templateUrl: 'static/views/partials/chat-main.ejs',
                controller: 'chatController'
            }

        }
      })
    });

    /*angular.element(document).ready(function() {
       angular.bootstrap(document, ['chat']);
   });*/

    //return angular.module(['chat']);


});
