require.config({
    paths: {
        'angular': '../bower_components/angular/angular.min',
        'mod': './mod',
        'app': './app',
        'directives': './directives',
        'services': './services',
        'socket-io': './socket.io/socket.io', //esposto da node
        'btford.socket-io': '../bower_components/angular-socket-io/socket',
        'ui.router': '../bower_components/angular-ui-router/release/angular-ui-router'
    },
    shim: {
        'angular': {
            exports: 'angular'
        },
        'btford.socket-io': {
            deps: ['angular', 'socket-io']
        },
        'ui.router': {
            deps: ['angular']
        },
        'app': {
            //These script dependencies should be loaded before loading
            //mod.js
            deps: ['mod', 'angular', 'ui.router']
        }
     }
});

/**
 * deps directives
 */
var directives = [
    'directives/friendsList/friendsList'
];

require(['app'], function(app) {

    require(directives, function () {
        console.log('Loaded directives');
        //Manually bootstrap angular
        angular.bootstrap(document, ['chat']);
    });
});
