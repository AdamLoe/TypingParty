let state = require("../state");

let derefPlayers = (gameID) => {
	let game = state.getGame(gameID);
	for (let playerID in game.players) {
		let player = state.getPlayer(playerID);
		if (player !== undefined) {
			if (player.gameID === game.id) {
				state.editPlayer(playerID, {
					gameID: null
				});
			}
		}
	}
};

let startRace = (gameID) => {
	let time = 120;
	state.editGame(gameID, {
		timeLeft: time,
		timeStart: Date.now(),
		timeEnd: Date.now() + time*1000,
		status: "RACE"
	});
};

let endRace = (gameID) => {
	let time = 10;
	state.editGame(gameID, {
		timeLeft: time,
		timeEnd: Date.now() + time*1000,
		status: "POSTGAME"
	});
};

let endGame = (gameID) => {
	derefPlayers(gameID);
	state.removeGameByID(gameID);
};

let handleRace = (gameID) => {
};


module.exports = (gameID) => {
	let { timeLeft, status } = state.getGame(gameID);

	if (timeLeft < 0) {
		if (status === "LOBBY")         startRace(gameID);
		else if (status === "RACE")     endRace(gameID);
		else if (status === "POSTGAME") endGame(gameID);
	} else {
		if (status === "RACE") handleRace(gameID);
	}
};

