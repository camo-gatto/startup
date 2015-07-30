/**
 * @abstract Cache
 */
function Cache() {}
Cache.prototype.get = function() {}
Cache.prototype.put = function() {}
Cache.prototype.keys = function() {}

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
/**
 * RedisCache implementation
 */
function RedisCache() {
  var cnf = require('../config/conf');
  this.redis = require('redis').createClient(cnf.redis.port, cnf.redis.host);
  this.SET = '*';
  this.redis.on('error', function (err) {
      throw err;
  });
}
RedisCache.prototype = new Cache();
RedisCache.prototype.get = function(key, callback) {
    this.redis.get(key, function(err, value) {
      if(err) {
        throw err;
      }else {
        callback(value);
      }
    });
}
RedisCache.prototype.values = function(keys,callback) {
    this.redis.mget(keys, function (err, values) {
      if(err) {
        throw err;
      }else {
        callback(values || []);
      }
    });
}
RedisCache.prototype.put = function(key, value, callback) {
    this.redis.set(key, value, function(err) {
        if(callback) {
          callback(err);
        }
    });
}
RedisCache.prototype.keys = function(callback) {
    this.redis.keys(this.SET, function (err, keys) {
      if(err) {
        throw err;
      }else {
        callback(keys || []);
      }
    });
}

RedisCache.prototype.remove = function(key) {
    this.redis.del(key);
}
/**
 * @instance RedisCache
 */
var cache = new RedisCache();
module.exports = cache;
