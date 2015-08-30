define(['application'], function (app) {
    app.controller('indexController', function ($scope) {
        console.log('indexController');
        $scope.foo = 'Hi..';
    });
});
