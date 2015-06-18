/**
 * pseudoclassical pattern
 */
function Socket() {}

Socket.prototype.emit = function() {/** @abstract */}
Socket.prototype.bind = function() {/** @abstract */}


/**
 *
 * @costructor SocketIo inherits from Socket
 */
function SocketIo(socket) {
    this.socket = socket;
}
SocketIo.prototype = new Socket();

/** 
 * @implement
 */



SocketIo.prototype.emit = function(event, data) {
    this.socket.emit(event, data);
}

SocketIo.prototype.bind = function(event, callback) {
    this.socket.on('disconnect', function() {
       callback(); 
    });
}

function ServerSocketIo(server) {
    this.server = server;
    this.sockets = {};
}
ServerSocketIo.prototype.onconnect = function(callback) {
    var that = this;
    this.server.on('connection', function(socket) {
        that.sockets[socket.id] = socket;
        callback(new SocketIo());
    });
}
ServerSocketIo.prototype.getConnectedSockedById = function(socketId) {
    return this.sockets[socketId];
}


module.exports.getSocket = function(server) {
    /**
     * @description resolve dependency
     * @return new ServerSocket
     */
    return new ServerSocketIo(server);
}