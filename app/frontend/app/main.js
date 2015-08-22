require.config({
    paths: {
        'angular': '../bower_components/angular/angular.min',
        'jquery': '../bower_components/jquery/dist/jquery.min',
        'mod': './mod',
        'application': './app',
        'directives': './directives',
        'controllers': './controllers',
        'services': './services',
        //'io': '/socket.io/socket.io', //esposto da node
        'io': '../bower_components/socket.io-client/socket.io', //client only for dev
        'btford.socket-io': '../bower_components/angular-socket-io/socket',
        'ui.router': '../bower_components/angular-ui-router/release/angular-ui-router',
        'routing': './routing',
        'angular-mocks': '../bower_components/angular-mocks/angular-mocks',
        'bootstrap-js': '../bower_components/bootstrap/dist/js/bootstrap.min',
        'require-css': '../bower_components/require-css/css',
        'mock': './mock/mock',
        'mock-conf': './mock/conf'
    },
    map: {
        '*' : {
            css: 'require-css'
        }
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
        'application': {
            //These script dependencies should be loaded before loading
            //mod.js
            deps: ['mod', 'angular', 'ui.router', 'btford.socket-io', 'angular-mocks']
        }
     }
});




var deps = [
    'require-css',
    'bootstrap-js',
    'directives/friendsList/friendsList',
    'directives/chat/chat',
    'routing',
    'mock'
];

require(['application', 'io'], function(app, io) {
    window.io = io;
    require(deps, function () {
        //Manually bootstrap angular
        angular.bootstrap(document, ['chat']);
    });
});
