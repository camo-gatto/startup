require.config({
    paths: {
        'angular': '../bower_components/angular/angular.min',
        'jquery': '../bower_components/jquery/dist/jquery.min',
        'mod': './mod',
        'app': './app',
        'directives': './directives',
        'controllers': './controllers',
        'services': './services',
        'io': '/socket.io/socket.io', //esposto da node
        //'io': '../bower_components/socket.io-client/socket.io',
        'btford.socket-io': '../bower_components/angular-socket-io/socket',
        'ui.router': '../bower_components/angular-ui-router/release/angular-ui-router',
        'routing': './routing',
        'angular-mocks': '../bower_components/angular-mocks/angular-mocks',
        'bootstrap': '../bower_components/bootstrap/dist/js/bootstrap.min',
        'mock': './mock/mock',
        'mock-conf': './mock/conf'
    },
    shim: {
        'angular': {
            deps: ['jquery'],
            exports: 'angular'
        },
        'mock': {
            deps: ['angular-mocks']
        },
        'angular-mocks': {
            deps: ['angular']
        },
        'btford.socket-io': {
            deps: ['angular', 'io']
        },
        'ui.router': {
            deps: ['angular']
        },
        'app': {
            //These script dependencies should be loaded before loading
            //mod.js
            deps: ['mod', 'angular', 'ui.router', 'btford.socket-io', 'angular-mocks']
        }
     }
});




var deps = [
    'bootstrap',
    'directives/friendsList/friendsList',
    'directives/chat/chat',
    'routing',
    'mock'
];

require(['app', 'io'], function(app, io) {
    window.io = io;
    require(deps, function () {
        //Manually bootstrap angular
        angular.bootstrap(document, ['chat']);
    });
});
