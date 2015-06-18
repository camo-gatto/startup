function Cache() {}

Cache.prototype.get = function() {}
Cache.prototype.set = function() {}

function LocalCache() {
    this.map = {};
}
LocalCache.prototype = new Cache();
LocalCache.prototype.get = function(key, callback) {
    callback(this.map[key]);
}
LocalCache.prototype.set = function(key, value, callback) {
    this.map[key] = value;
}
var cache = new LocalCache();
module.exports.getCache = function() {
    return cache;
}