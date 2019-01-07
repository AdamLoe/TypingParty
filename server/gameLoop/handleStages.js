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
	let time = 10;
	state.editGame(gameID, {
		info: {
			timeEnd: Date.now() + time*1000,
			status: "RACE"
		},
		gameData: {
			timeLeft: time,
		}
	});
};

let endRace = (gameID) => {
	let time = 10;
	state.editGame(gameID, {
		info: {
			timeEnd: Date.now() + time*1000,
			status: "POSTGAME"
		},
		gameData: {
			timeLeft: time,
		}
	});
};

let endGame = (gameID) => {
	console.log("ENDING GAME", gameID);
	derefPlayers(gameID);
	state.removeGameByID(gameID);
	console.log("TRY TO GET GAME", state.getGame(gameID));
};

let handleRace = (gameID) => {

};


module.exports = (gameID) => {
	let { status, timeEnd } = state.getGame(gameID).info;

	if (timeEnd < Date.now()) {
		if (status === "LOBBY")         startRace(gameID);
		else if (status === "RACE")     endRace(gameID);
		else if (status === "POSTGAME") endGame(gameID);
	} else {
		if (status === "RACE") handleRace(gameID);
	}
};

