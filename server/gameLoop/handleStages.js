let state = require("../state");

//Upon game close, remove all players
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

//On New Race Start
//We need to reset all players

//On Every Game Tick,
//We need to need recalculate all stats
//We also need to check if someone finished
	//If so, add to leaderboard score


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

let getFinishedPlayers = (gameData) =>
	Object.keys(gameData)
		.filter( playerID => gameData[playerID].finished)
		.map( playerID => gameData[playerID]);

let checkAlreadyFinished = (finished, gameData) =>
	finished.filter( player => !gameData[player.id].finished );

let sortFinishedPlayers = (finished) =>
	finished.sort( (p1, p2) => p1.finished - p2.finished );

let handleFinished = (gameID) => {

};

let handleWPM = (gameID) => {

};
//Combine all packets, get whoever finished
// This handle if somebody finished race, orders them accordingly
// Because packets are a-Synchronous, we cant update when receiving them
let handleRace = (gameID) => {
	let game = state.getGame(gameID);
	let packet = state.combinePackets(gameID);

	let { finished } = game.gameData;

	let finishedPlayers = getFinishedPlayers(packet.gameData);
	finishedPlayers = checkAlreadyFinished(finishedPlayers, game.gameData);
	finishedPlayers = sortFinishedPlayers(finishedPlayers);

	if (finishedPlayers.length > 0) {

		//Users should know if someone finished, but we don't normally set gameData to major
		state.setNextPacketMajor(gameID);
		state.editGame(gameID, {
			gameData: {
				finished: finished + finishedPlayers.length,
			}
		});
		finishedPlayers.map( (player, index) => {
			state.editGame(gameID, {
				gameData: {
					playerID: {
						finished: finished + index + 1
					}
				}
			});
		});
	}
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

