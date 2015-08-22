'use strict';
var path = require('path');

module.exports = function(grunt) {
    grunt.loadNpmTasks('grunt-karma');
    grunt.loadNpmTasks('grunt-express');
	grunt.initConfig({
        karma: {
          unit: {
            options: {
              frameworks: ['jasmine', 'requirejs'],
              singleRun: true,
              browsers: ['PhantomJS'],
              //logLevel: 'DEBUG',  //OFF, ERROR, WARN, INFO, DEBUG

              // base path that will be used to resolve all patterns (eg. files, exclude)
              basePath: '',


              // frameworks to use
              // available frameworks: https://npmjs.org/browse/keyword/karma-adapter


              // list of files / patterns to load in the browser


              // preprocess matching files before serving them to the browser
              // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
              preprocessors: {
              },


              // test results reporter to use
              // possible values: 'dots', 'progress'
              // available reporters: https://npmjs.org/browse/keyword/karma-reporter
              reporters: ['progress'],


              // web server port
              port: 9876,


              // enable / disable colors in the output (reporters and logs)
              colors: true,


              // level of logging
              // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
              //logLevel: config.LOG_INFO,


              // enable / disable watching file and executing tests whenever any file changes
              autoWatch: false,


              // start these browsers
              // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher


              // Continuous Integration mode
              // if true, Karma captures browsers, runs the tests and exits
              files: [
                  //'./bower_components/angular/angular.min.js',
                  //'./bower_components/angular-mocks/angular-mocks.js',
                  {pattern: 'app/test/*.js', included: false},
                  {pattern: 'app/**/*.js', included: false},
                  //{pattern: 'app/*.js', included: false},
                  {pattern: 'bower_components/**/*.js', included: false},
                  'app/test/test-main.js'
              ],
              // list of files to exclude
              exclude: [
                  'app/main.js',
                  'bower_components/angular-socket-io/socket.spec.js'
              ]
            }
          }
      },
      environment: {
          dev: 'DEV',
          int: 'INT',
          prod: 'PROD'
      },
      serve: {
          options: {
              port: 9000,
              path: '/static'
          }
      },
      express: {
          proxy: {
              options: {
                 server: path.resolve('proxy.js')
              }

          }
      }

    });

    grunt.registerTask('default', function () {
        grunt.log.ok('Ok');
    });

    grunt.task.registerMultiTask('environment', function () {
        var envJson = "environment.json";
        var json = grunt.file.readJSON(envJson);
        json.environment = this.data;
        grunt.file.write(envJson, JSON.stringify(json, null, 2));
        grunt.log.ok('Environment: ' + this.data + ' updated file: ' + envJson);

        var mockJs = "./app/mock/conf.js";
        var mockConf = grunt.file.read(mockJs);
        if(this.data === "DEV") {
            mockConf = mockConf.replace(/false/g, true);
        }else {
            mockConf = mockConf.replace(/true/g, false);
        }
        grunt.file.write(mockJs, mockConf);
        grunt.log.ok("Changed mock configuration file: ", mockJs);
        if(this.data === "DEV") {
            grunt.task.run('proxy');
        }

    });

    grunt.registerTask('test', ['karma']);

    grunt.registerTask('proxy', ['express', 'express-keepalive']);



};