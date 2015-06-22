/**
 * @config angular ui-router
 *
 */
angular.module('chat', ['btford.socket-io', 'ui.router']).config(function($stateProvider) {
  $stateProvider
    .state('state1', {
      url: "/route1",
      templateUrl: 'static/views/partials/state1.html'
    })
    .state('state2', {
      url: "/chat",
      templateUrl: 'static/views/partials/chat-main.ejs'
    })
});