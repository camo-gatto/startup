var session= require('express-session');
var redisStore = require('connect-redis')(session);
var cnf = require('../config/conf');
var redis =require("redis");
var redisAdapter = require('socket.io-redis');

var adapter = redisAdapter({
  pubClient: redis.createClient(cnf.redis.port,cnf.redis.host,{auth_pass:cnf.redis.password, no_ready_check: true}),
  subClient: redis.createClient(cnf.redis.port,cnf.redis.host, {auth_pass:cnf.redis.password, detect_buffers: true, no_ready_check: true}),
})

/**
  client: create redis client used in CacheAbstract
  redisStore: create a redis store used in socketIoArch and in app
  adapter: export a redisAdapter used in socketIoArch
**/
var client = redis.createClient(cnf.redis.port,cnf.redis.host, {auth_pass:cnf.redis.password, no_ready_check: true});
module.exports = {
    client: client,
    redisStore: new redisStore({host: cnf.redis.host, port:cnf.redis.port, client: client}),
    adapter: adapter
}
