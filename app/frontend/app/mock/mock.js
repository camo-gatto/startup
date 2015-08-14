define([], function () {


    var app = angular.module('myMockModule', ['ngMockE2E']);
    app.factory('myMockFactory', function ($httpBackend, $http) {

        $httpBackend.when('GET', '/entries').respond([
            { id: 1, name: "Entry 1" },
            { id: 2, name: "Entry 2" }
          ]);

          return {
              get: function () {
                  $http.get('/entries').success(function (data) {
                      console.log('data', data);
                  }).error(function (error) {
                      console.log(error);
                  });
              }
          };
    });
});
