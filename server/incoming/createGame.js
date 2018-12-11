let state = require("../state");
let getString = require("../strings");

let getRandom = () => Math.floor(Math.random() * 10**10).toString();

let getGameID = () => {
	let gameID = getRandom();
	while (gameID in state.getGameIDs()) {
		gameID = getRandom();
	}
	console.log("GameID", gameID);
	return gameID;
};

let getChars = (string) => {
	let chars = 0;
	string.map( char => {
		if (char !== " ") {
			chars += 1;
		}
	});
	return chars;
};

let lobbyTime = 12;
exports.createGame = (playerID) => {
	let string = getString();
	let game = {
		id: getGameID(),
		status: "LOBBY",
		string: string,
		words: string.split(" "),
		players: [],
		playerCount: 0,
		maxWords: string.split(" ").length,
		timeLeft: lobbyTime,
		timeEnd: Date.now() + lobbyTime * 1000,
	};
	state.addGame(game);
	return game;
};

exports.addPlayerToGame = (gameID, playerID) => {
	let game = state.getGame(gameID);
	let player = state.getPlayer(playerID);

	state.editGame(gameID, {
		players: [
			...game.players,
			player
		],
		playerCount: game.playerCount + 1
	});
};
