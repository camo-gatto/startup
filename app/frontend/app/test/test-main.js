var allTestFiles = [];
var TEST_REGEXP = /(spec|test)\.js$/i;
// Get a list of all the test files to include
Object.keys(window.__karma__.files).forEach(function(file) {
  if (TEST_REGEXP.test(file)) {
    // Normalize paths to RequireJS module names.
    // If you require sub-dependencies of test files to be loaded as-is (requiring file extension)
    // then do not normalize the paths
    var normalizedTestModule = file.replace(/^\/base\/|\.js$/g, '');
    allTestFiles.push(normalizedTestModule);
  }
});

/**
 * http://monicalent.com/blog/2015/02/11/karma-tests-angular-js-require-j/
 **/

require.config({
  // Karma serves files under /base, which is the basePath from your config file
  baseUrl: '/base',
  paths: {
    'angular': 'bower_components/angular/angular.min',
    'angular-mocks': 'bower_components/angular-mocks/angular-mocks',
    'btford.socket-io': 'bower_components/angular-socket-io/socket',
    'ui.router': 'bower_components/angular-ui-router/release/angular-ui-router',
    'mod': 'app/mod',
    'application': 'app/app',
    'directives': 'app/directives'
  },
  shim: {
      'angular': {
          exports: 'angular'
      },
      'angular-mocks': {
          deps: ['angular']
      },
      'btford.socket-io': {
          deps: ['angular']
      },
      'ui.router': {
          deps: ['angular']
      },
      'application': {
          deps: ['angular', 'angular-mocks', 'btford.socket-io', 'ui.router']
      }
  },

  // dynamically load all test files
  deps: allTestFiles,

  // we have to kickoff jasmine, as it is asynchronous
  callback: window.__karma__.start
});
