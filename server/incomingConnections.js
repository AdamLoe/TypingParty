let state = require("./state");
let { createGame, addPlayerToGame } = require("./incoming/createGame");
let { findGame } = require("./incoming/findGame");

let kickPlayer = (socket, message) => {
	console.log(socket.id, message);
};

let getStats = (string, words, currWord, minutes) => {
	let completed = words.slice(0, currWord).join(" ").length;

	return {
    	wpm: Math.round( completed / minutes / 5),
		progress: completed / string.length * 100
	};
};

exports.playerUpdate = (data, socket) => {
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

let getName = () => {
	let names = [
		"adam",
		"katie",
		"bella",
		"steve",
	];
	let index = Math.floor( Math.random() * names.length );
	return names[index];
}
exports.initiatePlayer = (socket) => {
	let player = {
		id: socket.id,
		name: getName(),
		gameID: null,
		currWord: 0,
		progress: 0,
		wpm: 0,
	};
	state.addPlayer(player);
};

exports.gotoMenu = (socket) => {
	console.log("SERVER GOING TO MENU");
	let { gameID } = state.getPlayer(socket.id);
	socket.leave(gameID);
	state.resetPlayer(socket.id);
};

exports.gotoRace = (socket) => {
	let player = state.getPlayer(socket.id);
	socket.leave(player.gameID);
	state.resetPlayer(socket.id);

	let game = findGame(socket.id) || createGame(socket.id);
	addPlayerToGame(game.id, socket.id);

	state.editPlayer(socket.id, {
		gameID: game.id,
	});
	socket.join(game.id);
};
