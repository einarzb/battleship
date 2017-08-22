var emitManager = require('./emitsManager');

var connection = function(io) {
    io.on('connection', function(socket) {
        console.log( 'User id ' + socket.id + ' is connected' );
        emitManager(socket, io);
    });
}
module.exports = connection;
