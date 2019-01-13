let state = require("../state");
let { emitRoom } = require("../socket");
let handleStages = require("./handleStages");

module.exports = () => {
	//state.logGames();
	console.log(state.getGameIDs());
	state.getGameIDs().map( (gameID) => {
		updateTime(gameID);
		handleStages(gameID);
		sendUpdates(gameID);
	});
};


let sendUpdates = (gameID) => {
	//Flushing packets now calls handleStages();
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