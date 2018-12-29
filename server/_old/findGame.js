let state = require("../state");

let maxPlayers = 5;

exports.findGame = (playerID) => {
	let games = getAvailableGames();
	let game = pickGame(games);
	console.log("Found Games", games.map(game => (game.id + typeof game)) );
	return game;
};

let pickGame = (games) => {
	return games[0];
};

let getAvailableGames = () => {
	let games = [];

	state.getGameIDs().map(gameID => {
		let game = state.getGame(gameID);
		let { status, playerCount, timeLeft } = game;

		let isLobby = (status === "LOBBY");
		let hasRoom = (playerCount < maxPlayers);
		let hasTime = (timeLeft > 3);

		if (isLobby && hasRoom && hasTime) {
		    games.push(game);
		}
	});

	return games;
};