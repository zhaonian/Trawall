var instance;

module.exports = {
        getInstance: function () {
                return instance;
        },
        setup: function (server) {
                instance = require('socket.io')(server);
                instance.on('connection', function (socket) {
                        console.log('a user connected');
                });
        }
};