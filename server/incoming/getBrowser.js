let state = require("../state");

let getGames = (filters) => {
	let gameIDs = state.getGameIDs();

	return gameIDs.map( gameID => {
		let game = state.getGame(gameID);
		game.password = "No hacking allowed bruther";

		return game;
	});
};

module.exports = (socket, filters) => {
	let gameArr = getGames(filters);
	socket.emit("updateBrowserData", gameArr);
};