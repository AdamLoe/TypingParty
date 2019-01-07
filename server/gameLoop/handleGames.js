let state = require("../state");
let { emitRoom } = require("../socket");
let handleStages = require("./handleStages");

module.exports = () => {
	//state.logGames();
	console.log(state.getGameIDs());
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
	let { majorVersion, minorVersion, packet } = state.flushPackets(gameID);
	emitRoom(
		gameID,
		"updateGameData",
		{
			majorVersion,
			minorVersion,
			packet
		}
	);
};

let updateTime = (gameID) => {
	let { timeEnd } = state.getGame(gameID).info;

	let milli = timeEnd - Date.now();
	let seconds = Math.floor(milli / 1000);

	state.editGame(gameID, {
		gameData: {
			timeLeft: seconds
		}
	});
};