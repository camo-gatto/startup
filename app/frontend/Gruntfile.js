'use strict';

module.exports = function(grunt) {
    grunt.loadNpmTasks('grunt-karma');


	grunt.initConfig({
        karma: {
          unit: {
            options: {
              frameworks: ['jasmine'],
              singleRun: true,
              browsers: ['PhantomJS'],
              files: [
                '**/*.js'
              ]
            }
          }
        }

    });

    grunt.registerTask('default', function () {
        grunt.log.ok('Ok');
    });

    grunt.registerTask('test', [
        'karma'
    ]);





};
