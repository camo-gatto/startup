'use strict';

module.exports = function(grunt) {
	grunt.loadNpmTasks('grunt-shell');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	var cnf=require('./config/conf');

	var linux=/linux/,
	osx=/darwin/,
	win=/win32/;
	var newTermInit="";
	var newTermEnd="";

	grunt.initConfig({
		shell: {
			serverStart: {
				command: function() {
					var initVariable="nodemon ";
					if(cnf.env=='INT'){
						newTermInit="";
						newTermEnd="";
						initVariable="forever start -a -l" + cnf.node.logfile + " ";
					}
					console.log(newTermInit+initVariable + cnf.node.initfile+newTermEnd);
					var dir = '';
					if(osx.test(process.platform)) {
						dir = cnf.location.root + 'app/backend/';
					}
					console.log(newTermInit + initVariable + dir + cnf.node.initfile + newTermEnd);
					return newTermInit + initVariable + dir + cnf.node.initfile + newTermEnd;

				}
			},
			serverStop: {
				command: function(){
					var initVariable="";
					if(cnf.env=='DEV'){
						var dir = '';
						if(osx.test(process.platform)) {
							dir = cnf.location.root + 'app/backend/';
						}
						return "kill $(ps aux | grep -v grep |grep 'nodemon " + dir + cnf.node.initfile+"' | awk '{print $2}')";
					}else if(cnf.env=='INT'){
						initVariable = "forever stop ";
					}
					return initVariable + cnf.node.initfile;
				}
			},
			serverShow: {
				command: function(){
					if(cnf.env=="DEV"){
						return "ps aux | grep -v grep |grep '" + cnf.node.initfile + "'";
					}else if(cnf.env=="INT"){
						return "forever list";
					}
				}
			},
			mongoStart: {
				command: function() {
					var initVariable="";
					if(cnf.env=='INT'){
						newTermInit="";
						newTermEnd="";
						initVariable ='--fork  --logpath '  + cnf.mongo.logfile;
					}
					var mongo = "";
					if(osx.test(process.platform)) {
						mongo = cnf.mongo.bin + "/";
					}
					var command = newTermInit + mongo + "mongod --config " + cnf.mongo.fileconf + " --port " + cnf.mongo.port +
					" --dbpath "+ cnf.mongo.storage+" "+ initVariable+newTermEnd;
					return command;
				}
			},
			mongoStop: {
				command: function() {
					var mongo = "";
					if(osx.test(process.platform)) {
						mongo = cnf.mongo.bin + "/";
					}
					var command = mongo + "mongod --shutdown --dbpath "+ cnf.mongo.storage;
					return command;
				}
			},
			mongoShow: {
				command: function() {
					var command = 'ps aux| grep -v grep | grep \"mongo\"';
					return command;
				}
			},
			redisStart: {
				command: function() {
					var initVariable="";
					if(cnf.env=="DEV"){
						initVariable="--daemonize no";
					}else if(cnf.env=="INT"){
						newTermInit="";
						newTermEnd="";
						initVariable="--daemonize yes " + " --logfile " + cnf.redis.logfile;
					}
					var command = newTermInit+"redis-server "+ cnf.redis.fileconf +" --port " + cnf.redis.port + " --loglevel " + cnf.redis.loglevel +
					" --pidfile "+cnf.redis.pidfile +" --dir "+cnf.redis.storage+" "+initVariable + newTermEnd;
					console.log(command);
					return command;

				}
			},
			redisStop: {
				command: function() {
					var command = 'redis-cli shutdown';
					return command;
				}
			},
			redisShow: {
				command: function() {
					var command = 'ps aux | grep -v grep |grep \"redis-server\"';
					return command;
				}
			},
			inspector:{
				command: function(){
					if(cnf.env=="INT"){
						return "";
					}
					var command = newTermInit + "node-inspector" + newTermEnd;
					return command;
				}
			},
			debugger:{
				command: function(){
					if(cnf.env=="INT"){
						return "";
					}
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

grunt.registerTask('linting', ['jshint']);

grunt.registerTask('start', function(){
	if(linux.test(process.platform)){
		newTermInit="gnome-terminal --command=\"";
		newTermEnd="\""
		console.log("Task for Linux");
		grunt.task.run(['shell:redisStart']);
		grunt.task.run(['shell:mongoStart']);
		grunt.task.run(['shell:serverStart']);
	}else if(osx.test(process.platform)){
		newTermInit = "osascript -e 'tell app \"Terminal\"' -e 'do script \"";
		newTermEnd = "\"' -e 'end tell'";

		console.log("Task for OSX");
		grunt.task.run(['shell:redisStart']);
		grunt.task.run(['shell:mongoStart']);
		grunt.task.run(['shell:serverStart']);
	}
});

grunt.registerTask('stop', function(){
	if(linux.test(process.platform)||osx.test(process.platform)){
		console.log("Stopping ALL Process");
		grunt.task.run(['shell:serverStop']);
		grunt.task.run(['shell:redisStop']);
		grunt.task.run(['shell:mongoStop']);
	}
});

grunt.registerTask('startDebug', function(){
	if(linux.test(process.platform)){
		newTermInit="gnome-terminal --command=\"";
		newTermEnd="\""
		console.log("Debug for Linux");
		//grunt.task.run(['shell:redisStart']);
		//grunt.task.run(['shell:mongoStart']);
		grunt.task.run(['shell:inspector']);
		grunt.task.run(['shell:debugger']);
	}else if(osx.test(process.platform)){
		newTermInit="";
		newTermEnd="";
		console.log("Debug for OSX");
		grunt.task.run(['shell:redisStart']);
		grunt.task.run(['shell:mongoStart']);
		grunt.task.run(['shell:inspector']);
		grunt.task.run(['shell:debugger']);
	}
});

};
