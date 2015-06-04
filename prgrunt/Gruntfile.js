'use strict';
module.exports = function(grunt) {
    grunt.loadNpmTasks('grunt-shell');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.initConfig({
        log: {
            foo: [1, 2, 3]
        },
        copy: {
            target: {
                files: {
                    'dest/file1.txt': 'src/file1.txt'
                }
            }
        },
        shell: {
            startMongo: {
                command: function() {
                    var cnf = grunt.file.readJSON('conf.json');
                    var command = cnf.mongo.mongodpath + '/mongod --dbpath ' + cnf.mongo.dbpath;
                    return command;
                }
            },
            mongoClient: {
                command: function() {
                    var cnf = grunt.file.readJSON('conf.json');
                    var command = cnf.mongo.mongodpath + '/mongo';
                    return command;
                }
            }
        },
        jshint: {
            options: {
                strict: true,  //This option requires all functions to run in ECMAScript 5's strict mode.
                curly: true,    //This option requires you to always put curly braces around blocks in loops and conditionals.
                eqeqeq: true,   //This options prohibits the use of == and != in favor of === and !==.
                unused: false,  //This option warns when you define and never use your variables.
                undef: true,    //This option prohibits the use of explicitly undeclared variables
                node: true  //This option defines globals available when your code is running inside of the Node runtime environment
            },
            backendTarget: ['Gruntfile.js', '*.js']
        }
    });

    // A very basic default task. viene eseguito lanciando da terminale: grunt
    grunt.registerTask('default', 'Log some stuff.', function() {
        //TODO
    });
    
    //viene eseguito lanciando da terminale: grunt default2
    grunt.registerTask('default2', 'Log some stuff.', function() {
        grunt.log.write('Logging some stuff...').ok();
    });
    grunt.registerTask('linting', ['jshint']);
    
    grunt.registerMultiTask('log', function() {
        //this.data: In a multi task, this is the actual data stored in the Grunt config object for the given target
        //this.target: In a multi task, this property contains the name of the target currently being iterated over.
        grunt.log.writeln(this.target + ': ' + this.data).ok();
    });
    
    
    
    
    
    

};