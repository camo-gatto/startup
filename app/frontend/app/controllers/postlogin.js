define(['application'], function (app) {
    app.controller('postloginController', function ($rootScope) {
        $rootScope.$on('$stateChangeStart', function (event, toState) {
            console.log('$stateChangeStart', toState);
        });

    });
});
