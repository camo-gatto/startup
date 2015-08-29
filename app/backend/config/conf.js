var location = {
	"application": "/devenv/startup/application",
	"root": "/devenv/startup/",
	"log": "/devenv/startup/logs"
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
		//"host":"104.167.106.207",
		"host":"localhost",
		"storage":location.application+"/dbs/mongodb/data/",
		"port":27017,
		"password": "camogatto",
		"bin": location.application + "/mongo/bin"
	},
	"redis": {
		"logfile": location.log + "/redis.log",
		"fileconf":location.application+"/dbs/redisdb/redis.conf",
		"pidfile": location.application+"/dbs/redisdb/data/redis.pid",
		"storage":location.application+"/dbs/redisdb/data/",
		//"host": "104.167.106.207",
		"host":"localhost",
		"port":6379,
		"password": "camogatto",
		"loglevel":"debug" //debug,verbose,notice,warning
	},
	"session": {
		"secret": "camogatto",
		"expiration": 5184000
	},
	location: location
}
