define(['application', 'mock-conf'], function (app, mockConf) {


    app.run(function ($httpBackend) {

        $httpBackend.whenGET(/static/).passThrough();
        if(!mockConf.mockenabled) {
            $httpBackend.whenGET(/private/).passThrough();
        }



        $httpBackend.whenGET('/private/api/userslist').respond(function (method, url, data) {

            var friends = [
                {name: "john", surname: "sad", profile: "/static/app/resources/friends/128.jpg", online: true, socket: "gmP4ZvJpaWpRNeq0AAAZ"},
                {name: "Maya", surname: "sadsad", profile: "/static/app/resources/friends/129.jpg", online: false, socket: "AWP4ZvJpaWpRNeq0AAAZ"},
                {name: "Lisa", surname: "sad", profile: "/static/app/resources/friends/130.jpg", online: false, socket: "gmP4LvJpaWpRNeq0ApRN"},
                {name: "Irwin", surname: "Mueller", profile: "/static/app/resources/friends/131.jpg", online: true, socket: "gmP4ZvJpaWpRNeq01OAR"}
            ];
            return [200, friends];
        });

    });

});
