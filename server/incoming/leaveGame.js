let state = require("../state");

module.exports = (socket, gameID) => {

};

exports.gotoMenu = (socket) => {
	console.log("SERVER GOING TO MENU");
	let { gameID } = state.getPlayer(socket.id);
	socket.leave(gameID);
	state.resetPlayer(socket.id);
};
