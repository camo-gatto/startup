var location = {
	"application": "/Users/nicoladesimone/Documents/dev/startup/application",
	"root": "/Users/nicoladesimone/Documents/dev/startup/",
	"log": "/Users/nicoladesimone/Documents/dev/startup/logs"
};
module.exports = {
	"env":"DEV", //enviroment value DEV or INT
	"node": {
		"initfile":"cluster.js",
		"logfile": location.log + "/nodejs.log",
		"host":"localhost",
		"port":3000,
		"isClustered": true
	},
	"mongo": {
		"dbname":"mydb",
		"logfile": location.log + "/mongodb.log",
		"fileconf": location.application+"/dbs/mongodb/mongod.conf",
		"host":"localhost",
		"storage":location.application+"/dbs/mongodb/data/",
		"port":27017,
		"bin": location.application + "/mongo/bin"
	},
	"redis": {
		"logfile": location.log + "/redis.log",
		"fileconf":location.application+"/dbs/redisdb/redis.conf",
		"pidfile": location.application+"/dbs/redisdb/data/redis.pid",
		"storage":location.application+"/dbs/redisdb/data/",
		"host": "localhost",
		"port":6379,
		"loglevel":"debug" //debug,verbose,notice,warning
	},
	location: location
}