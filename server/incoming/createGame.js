let state = require("../state");
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

let sanitizeFilters = (filters) => {
	console.log("WARNING: NOT SANITIZING CREATOR FILTERS");
	let {
		Server_Name, Password, Max_Players,
		Max_Games, Scoring_Type, Handicaps
	} = filters;
	return {
		name: Server_Name || "",
		password: Password || "",
		maxPlayers: Max_Players || 4,
		maxGames: Max_Games || 5,
		scoringType: Scoring_Type || "Default",
		handicaps: Handicaps || "Off"
	};
};

let lobbyTime = 12;
module.exports = (socket, filters) => {
	let game = {
		id: getGameID(),
		status: "LOBBY",
		string: getString(),
		players: [],
		playerCount: 0,
		timeLeft: lobbyTime,
		timeEnd: Date.now() + lobbyTime * 1000,
		host: state.getPlayerIDBySocket(socket),

		currGame: 0,
		leaderboard: {

		},
		banList: {

		},
		...sanitizeFilters(filters),
};
state.addGame(game);
joinGame(socket, { gameID: game.id, password: game.password });
};

