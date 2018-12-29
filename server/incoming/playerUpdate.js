let state = require("../state");

let kickPlayer = require("../helpers/kickPlayer");

let getStats = (string, words, currWord, minutes) => {
	let completed = words.slice(0, currWord).join(" ").length;

	return {
		wpm: Math.round( completed / minutes / 5),
		progress: completed / string.length * 100
	};
};

module.exports = (socket, data) => {
	let { currWord, finished } = data;
	let game = state.getGameByPlayerID(socket.id);

	if (game !== undefined ) {
		let { maxWords, words, string, timeStart } = game;

		let millis = (Date.now() - timeStart);
		let minutes = millis / 1000 / 60;

		if (finished === true) {
			state.updatePlayerInGame(game.id, socket.id, {
				finished,
				progress: 100,
				currWord: maxWords
			});
		} else {
			state.updatePlayerInGame(game.id, socket.id, {
				currWord,
				...getStats(string, words, currWord, minutes)
			});
		}
	} else {
		kickPlayer(socket, "Server dead");
	}
};