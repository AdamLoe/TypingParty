let state = require("../state");
let { emitRoom } = require("../socket");

module.exports = (socket, message) => {
	let playerID = 	state.getPlayerIDBySocket(socket);
	let game = state.getGameByPlayerID(playerID);

	console.log("Received Message", message, "from", playerID);

	emitRoom(game.id, "newMessage", {
		id: playerID,
		text: message,
		time: Date.now()
	});
};