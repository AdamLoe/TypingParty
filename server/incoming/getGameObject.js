let state = require("../state");

module.exports = (socket, gameID) => {
	let game = state.getGame(gameID);
	let { majorVersion, minorVersion } = state.getPacketVersion(gameID);

	socket.emit("updateGameObject", {
		majorVersion,
		minorVersion,
		game: game
	});
};