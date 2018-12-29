let state = require("../state");

let doesGameExist = (game) => {
	return game !== undefined;
};
let gameHasRoom = (game) => {
	return game.playerCount < game.maxPlayers;
};
let doesPasswordMatch = (game, password) => {
	return (game.password === password);
};
let isUserBanned = (game, player) => {
	let { banList } = game;
	return (player.id in banList);
};

let joinError = (socket, message) => {
	console.log("JOINERROR:", message);
	socket.emit("Error", {
		errorType: "JOINING",
		message
	});
};

let joinGame = (socket, game, player) => {
	socket.leave(player.gameID);
	socket.join(game.id);

	state.addPlayerToGame(game.id, player);
	state.editPlayer(player.id, {
		gameID: game.id
	});

	console.log(player.id, "joining", game.id);
};

module.exports = async (socket, { gameID, password }) => {
	let player = state.getPlayerBySocket(socket);
	let game = state.getGame(gameID);

	if (!doesGameExist(game)) {
		joinError(socket, "Game does not exist anymore");
	} else if (!gameHasRoom(game)) {
		joinError(socket, "Game is full");
	} else if (!doesPasswordMatch(game, password)) {
		joinError(socket, "Password does not match");
	} else if (isUserBanned(game, player)) {
		joinError(socket, "You are banned");
	} else {
		joinGame(socket, game, player);
	}
};