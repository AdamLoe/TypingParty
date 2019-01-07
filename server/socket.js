let socketIO = require("socket.io");
let io;

exports.startSocket = (server) => {
	io = socketIO(server);
};

exports.getSocket = () => {
	return io;
};

exports.emitRoom = (id, message, data) => {
	//console.log("emitting to room", id, "with", message);
	io.to(id).emit(message, data);
};
