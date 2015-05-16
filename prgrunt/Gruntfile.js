module.exports = function(grunt) {
    grunt.loadNpmTasks('grunt-shell');
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
            },
            startServer: {
                command: function() {
                    var cnf = grunt.file.readJSON('package.json');
                    return "node " + cnf.main;
                }
            },
            nodeCluster: {
                command: function() {
                    var cnf = grunt.file.readJSON('package.json');
                    return "NODE_DEBUG=cluster node " + cnf.main;
                }
            }
        }
    });

    // A very basic default task. viene eseguito lanciando da terminale: grunt
    grunt.registerTask('default', 'Log some stuff.', function() {
        grunt.log.write('Exec node main ').ok();
        grunt.task.run('shell:startServer');
    });
    
    //viene eseguito lanciando da terminale: grunt default2
    grunt.registerTask('default2', 'Log some stuff.', function() {
        grunt.log.write('Logging some stuff...').ok();
    });
    
    grunt.registerMultiTask('log', function() {
        //this.data: In a multi task, this is the actual data stored in the Grunt config object for the given target
        //this.target: In a multi task, this property contains the name of the target currently being iterated over.
        grunt.log.writeln(this.target + ': ' + this.data).ok();
    });
    
    
    
    
    
    

};