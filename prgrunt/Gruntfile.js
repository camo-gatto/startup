'use strict';

module.exports = function(grunt) {
    //platforms 'darwin', 'freebsd', 'linux', 'sunos' or 'win32'
    grunt.loadNpmTasks('grunt-shell');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    var cnf=require('./config/conf');
    var newTermInit='';
    var newTermEnd='';
    
    var linux=/linux/,
        osx=/darwin/,
        win=/win32/;
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
            startServer: {
                command: function() {
                    var command =newTermInit + 'nodemon cluster.js'+newTermEnd;
                    return command;
                }
            },  
            /*
            startMongoLinux: {
                command: function() {
                    var command = "gnome-terminal --command=\""+cnf.mongo.mongodpath + '/mongod --dbpath ' + cnf.mongo.dbpath+"\"";
                    return command;
                }
            },*/
            startMongo: {
                command: function() {
                    var command = newTermInit + cnf.mongo.mongodpath + '/mongod --dbpath ' + cnf.mongo.dbpath + newTermEnd;
                    return command;
                }
            },
            mongoClient: {
                command: function() {
                    var command = cnf.mongo.mongodpath + '/mongo';
                    return command;
                }
            },
            startInspector:{
                command: function(){
                    var command = newTermInit + "node-inspector" + newTermEnd;
                    return command;
                }
            },
            startDebugger:{
                command: function(){
                    var command = newTermInit + "node --debug debugger.js"+ newTermEnd;
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
   /* grunt.registerTask('default', 'Log some stuff.', function() {
        //TODO
    });*/
    
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
    
    grunt.registerTask('start', function(){
        if(linux.test(process.platform)){
            newTermInit="gnome-terminal --command=\"";
            newTermEnd="\""
            console.log("Task for Linux");
            grunt.task.run(['shell:startMongo']);
            grunt.task.run(['shell:startServer']);    
        }else if(osx.test(process.platform)){
            newTermInit="";
            newTermEnd="";
            console.log("Task for OSX");
            grunt.task.run(['shell:startMongo']);
            grunt.task.run(['shell:startServer']);            
        }else if(win.test(process.platform)){
            newTermInit="start ";
            newTermEnd="";
            console.log("Task for Windows");
            //grunt.task.run(['shell:startMongo']);
            grunt.task.run(['shell:startServer']);

        }
    
        
    });
    
    grunt.registerTask('startDebug', function(){
        if(linux.test(process.platform)){
            newTermInit="gnome-terminal --command=\"";
            newTermEnd="\""
            console.log("Debug for Linux");
            grunt.task.run(['shell:startMongo']);
            grunt.task.run(['shell:startInspector']); 
            grunt.task.run(['shell:startDebugger']);    
        }else if(osx.test(process.platform)){
            newTermInit="";
            newTermEnd="";
            console.log("Debug for OSX");
            grunt.task.run(['shell:startMongo']);
            grunt.task.run(['shell:startInspector']); 
            grunt.task.run(['shell:startDebugger']);    
                        
        }else if(win.test(process.platform)){
            newTermInit="";
            newTermEnd="";
            console.log("Debug for Windows");   
            grunt.task.run(['shell:startMongo']);
            grunt.task.run(['shell:startInspector']); 
            grunt.task.run(['shell:startDebugger']);    

        }
    
        
    });
    
    
    
    
    
    
    

};