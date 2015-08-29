function Socket(server) {
    var cnf = require('../config/conf');
    var redis = require('./redisArch');
    var cookieParser = require('cookie-parser');
    this.io = require('socket.io')(server);
    var passportSocketIo = require('passport.socketio');

    this.io.use(passportSocketIo.authorize({
        cookieParser: cookieParser,
        key: 'connect.sid',
        secret: cnf.session.secret,
        store:redis.redisStore,
        fail : function(data, message, error, accept) {
            if(error){
                throw new Error(message);
            }
            console.log("Passport not autorize"); accept(); },
        success: function(data, accept) {
          console.log('passportSocketIo authorized');
          // console.log("Passport autorize",data);
          accept();
        }
    }));
    this.io.adapter(redis.adapter);
}

module.exports = function (server) {
    var socket = new Socket(server);
    return socket.io;
}
