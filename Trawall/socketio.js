var instance;
var userSocket = new Map();
var socketUser = new Map();

module.exports = {
        getInstance: function () {
                return instance;
        },
        setup: function (server) {
                instance = require('socket.io')(server);
                instance.on('connection', function (socket) {
                        console.log('a user connected');
                        socket.on("connection_ii", function (userId) {
                                console.log("Setup connection for user " + userId);
                                userSocket.set(userId, socket);
                                socketUser.set(socket.id, userId);
                        });
                        socket.on("disconnect", function () {
                                console.log("Disconnect user " + userId + " from server.");
                                var userId = socketUser.get(socket.id);
                                socketUser.delete(socket.id);
                                userSocket.delete(userId);
                        });
                });
        },
        getUserSocket: function (userId) {
                return userSocket.get(userId);
        }
};