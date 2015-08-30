define(['application', 'controllers/index'], function (application) {


    application.config(function($stateProvider) {
        $stateProvider
            .state('index', {
                abstract: true,
                template: '<div ui-view="chat-view"></div>',
                controller: 'indexController'
            })
            .state('index.chat', {
                url: '',
                views: {
                    'chat-view': {
                        templateUrl: '/static/views/partials/state1.html'
                    }
                }
            })



    });

});
