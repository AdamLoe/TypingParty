let state = require("../state");

let maxPlayers = 5;

exports.findGame = (playerID) => {
	console.log("FINDING GAME");
	let games = getAvailableGames();
	console.log(games);
	console.log("FOUND GAME", games[0]);
	return games[0];
};

let getAvailableGames = () => {
	return state.getGameIDs().map(gameID => {
		let game = state.getGame(gameID);
		let { status, playerCount, timeLeft } = game;

		let isLobby = (status === "LOBBY");
		let hasRoom = (playerCount < maxPlayers);
		let hasTime = (timeLeft > 3);

		console.log(game.id, isLobby, hasRoom, hasTime);
		if (isLobby && hasRoom && hasTime) {
			return game;
		}
	});
};