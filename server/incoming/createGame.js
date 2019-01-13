let state = require("../state");

let sanitizeGameOptions = require("./sanitizeGameOptions");
let getString = require("../strings");
let joinGame = require("./joinGame");

let getRandom = () => Math.floor(Math.random() * 10**10).toString();
let getGameID = () => {
	let gameID = getRandom();
	while (gameID in state.getGameIDs()) {
		gameID = getRandom();
	}
	return gameID;
};

let lobbyTime = 12;

let getGame = (playerID, options) => {
	let {
		name, password,maxPlayers,
		maxGames, scoringType, handicaps
	} = sanitizeGameOptions(options);

	return {
		id: getGameID(),

		info: {
			name
			, password,
			host: playerID,

			scoringType, handicaps,
			maxPlayers,	maxGames,

			status: "LOBBY",
			string: getString(),
			playerCount: 0, currGame: 0,

			timeEnd: Date.now() + lobbyTime * 1000

		},

		//Holds id, name, icon, and any future data we want to show
		players: {},

		//This is what we update every tick, progress/WPM of each player
		gameData: {
			finished: 0,
			timeLeft: lobbyTime
		},

		banList: {}
	};
};
module.exports = (socket, options) => {
	let playerID = state.getPlayerIDBySocket(socket);
	let game = getGame(playerID, options);
	state.addGame(game);
	joinGame(socket, { gameID: game.id, password: game.info.password });
};
