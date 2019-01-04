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
module.exports = (socket, options) => {
	let {
		name, password,maxPlayers,
		maxGames, scoringType, handicaps
	} = sanitizeGameOptions(options);

	let game = {
		id: getGameID(),
		info: {
			name,
			password,

			status: "LOBBY",
			string: getString(),

			maxPlayers,
			maxGames,

			scoringType,
			handicaps,

			playerCount: 0,
			currGame: 0,

			host: state.getPlayerIDBySocket(socket),
		},


		timeLeft: lobbyTime,
		timeEnd: Date.now() + lobbyTime * 1000,

		//Holds id, name, icon, and any future data we want to show
		players: {},
		//Holds player id, and player score
		//PASSED TO USER AS ARRAY
		leaderboard: {
		},
		//Ordered by which players press join first
		//Could change dynamically throughout game if wanted
		//User could still put themselves on top, though
		order: [],
		//This is what we update every tick, progress/WPM
		gameData: {},

		banList: {}
	};
	state.addGame(game);
	joinGame(socket, { gameID: game.id, password: game.password });
};

