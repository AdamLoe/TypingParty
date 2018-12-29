let state = require("../state");
let { emitRoom } = require("../socket");
let handleStages = require("./handleStages");

module.exports = () => {
	//state.logGames();
	state.getGameIDs().map( (gameID) => {
		updateGame(gameID);
		sendUpdates(gameID);
        
	});
};

let updateGame = (gameID) => {
	updateTime(gameID);
	handleStages(gameID);
};

let sendUpdates = (gameID) => {
	let game = state.getGame(gameID);
	if (game !== undefined) {
		emitRoom(
			gameID,
			"updateGameData",
			game
		);
	}
};

let updateTime = (gameID) => {
	let { timeEnd } = state.getGame(gameID);

	let milli = timeEnd - Date.now();
	let seconds = Math.floor(milli / 1000);

	state.editGame(gameID, {
		timeLeft: seconds
	});
};