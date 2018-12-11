let socketIO = require("socket.io");
let io;

exports.startSocket = (server) => {
	io = socketIO(server);
};

exports.getSocket = () => {
	return io;
};

exports.updateRoom = (id, message, data) => {
	io.to(id).emit(message, data);
};