let storage = require("node-persist");

let players = {

};

let games = {

};


exports.gameExists = (gameID) => {
	return (gameID in games );
};

exports.getGameIDs = () => {
	return Object.keys(games);
};

exports.getGame = (gameID) => {
	return games[gameID];
};

exports.getGameByPlayerID = (playerID) => {
	let gameID = players[playerID].gameID;
	return games[gameID];
};

exports.addGame = (game) => {
	games[game.id] = game;
};

exports.removeGameByID = (id) => {
	delete games[id];
};

exports.editGame = (id, data) => {
	games[id] = {
		...games[id],
		...data
	};
};

exports.updatePlayerInGame = (gameID, playerID, data) => {
	let index = games[gameID].players.findIndex( player => player.id === playerID);
	games[gameID].players[index] = {
		...games[gameID].players[index],
		...data
	};
};

exports.addPlayerToGame = (gameID, player) => {
	games[gameID].players = {
		...games[gameID].players,
		player
	};
	games[gameID].playerCount = games[gameID].playerCount + 1;
};





exports.resetPlayer = (id) => {
	exports.editPlayer(id, {
		gameID: null,
		currWord: 0,
		progress: 0,
		wpm: 0,
	});
};

exports.getPlayer = (id) => {
	return players[id];
};
exports.getPlayerBySocket = (socket) => {
	return players[socket.id];
};
exports.getPlayerIDBySocket = (socket) => {
	return socket.id;
};

exports.addPlayer = (player) => {
	players[player.id] = player;
};

exports.editPlayer = (id, player) => {
	players[id] = {
		...players[id],
		...player
	};
};

exports.removePlayer = (id) => {
	delete players[id];
};




exports.logGames = () => {
	console.log(games);
};








exports.load = async function() {
	//console.time("loadState");
	await storage.init();

	let state;
	state = await storage.getItem("state")
		.then( data => data)
		.catch( err => console.log("err"));

	//console.timeEnd("loadState");
	return state;
};

exports.save = async function(state) {
	//console.time("saveState");
	await storage.init();
	await storage.setItem("state", state);
	//console.timeEnd("saveState");
};


/*
    Could use a database


 */