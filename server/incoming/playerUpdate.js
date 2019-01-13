let state = require("../state");

let kickPlayer = require("../helpers/kickPlayer");

// I maybe should update wpm for everyone each tick

let getStats = (string, words, currWord, timeStart) => {
	let millis = (Date.now() - timeStart);
	let minutes = millis / 1000 / 60;

	let completed = words.slice(0, currWord).join(" ").length;

	return {
		wpm: Math.round( completed / minutes / 5),
		progress: completed / string.length * 100
	};
};

module.exports = (socket, data) => {
	let { currWord} = data;

	let playerID = state.getPlayerIDBySocket(socket);
	let game = state.getGameByPlayerID(playerID);

	if (game !== undefined ) {
		let { maxWords, words, string, timeStart } = game;


		let hasFinished = (currWord >= maxWords);
		state.updatePlayerGameData(game.id, socket.id, {
			finished: (hasFinished? Date.now() : false ),
			currWord,
			...getStats(string, words, currWord, timeStart)
		});
	} else {
		kickPlayer(socket, "Server dead");
	}
};