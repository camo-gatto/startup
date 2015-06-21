var redis = require('redis').createClient(cnf.redis.port, cnf.redis.host);
function Cache() {}

Cache.prototype.get = function() {}
Cache.prototype.put = function() {}

function LocalCache() {
    this.map = {};
}
LocalCache.prototype = new Cache();
LocalCache.prototype.get = function(key, callback) {
    callback(this.map[key]);
}
LocalCache.prototype.put = function(key, value, callback) {
    this.map[key] = value;
}

function RedisCache() {}
RedisCache.prototype = new Cache();
RedisCache.prototype.get = function(key, callback) {
    redis.get(key, function(err, value) {
        callback(err, value);
    });
}
RedisCache.prototype.put = function(key, value, callback) {
    redis.set(key, value, function(err) {
        callback(err);
    });
}


var cache = new LocalCache();
module.exports.getCache = function() {
    return cache;
}