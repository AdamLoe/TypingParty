let storage = require("node-persist");

let players = {};
let games = {};
let saves = {};
let packets = {};

exports.addGame = (game) => {
	games[game.id] = game;
	packets[game.id] = {
		pendingPackets: [],
		majorVersion: 0,
		minorVersion: 0
	};
};
exports.getGame = (gameID) => {
	if (!exports.gameExists(gameID)) return null;
	return {
		...games[gameID],
		info: {
			...games[gameID].info,
			password: "No Hax"
		}
	};
};
exports.removeGameByID = (gameID) => {
	delete games[gameID];
	delete packets[gameID];
};


exports.editGame = (gameID, data) => {
	makeNewPacket(gameID, data);
};
let makeNewPacket = (gameID, data) => {
	let { pendingPackets } = packets[gameID];
	pendingPackets.push(data);
};
exports.flushPackets = (gameID) => {
	let { pendingPackets } = packets[gameID];
	let packet = combinePackets(pendingPackets);
	let { majorVersion, minorVersion } = getPacketVersion({ gameID, packet });
	applyPacket({ gameID, majorVersion, minorVersion, packet });
	return {
		majorVersion,
		minorVersion,
		packet
	};
};
let combinePackets = (packets) => {
	let combined = {};
	packets.map( packet => {
		combineObjects(combined, packet);
	});
	return combined;
};
let combineObjects = (oldObj, newObj) => {
	Object.keys(newObj).map( key => {
		if (oldObj[key] && typeof oldObj[key] === "object" && !Array.isArray(oldObj[key])) {
			combineObjects(oldObj[key], newObj[key]);
		} else {
			oldObj[key] = newObj[key];
		}
	});
	return oldObj;
};
let shouldNewMajorVersion = (data) => {
	return (
		(data.info !== undefined) ||
		(data.leaderboard !== undefined) ||
		(data.players !== undefined)
	);
};
let getPacketVersion = ({ gameID, packet }) => {
	let majorVersion = packets[gameID].majorVersion;
	let minorVersion = packets[gameID].minorVersion + 1;
	if (
		(packet.info !== undefined) ||
		(packet.leaderboard !== undefined) ||
		(packet.players !== undefined)
	) {
		majorVersion += 1;
		minorVersion = 0;
	}
	return {
		majorVersion,
		minorVersion
	};
};
let applyPacket = ({ gameID, majorVersion, minorVersion, packet }) => {
	console.log("Applying packet ", majorVersion + ":" + minorVersion, "to", gameID);
	console.log("data:", packet);
	let { info, players, leaderboard, gameData, banList } = packet;
	//Update packet data
	packets[gameID] = {
		...packets[gameID],
		pendingPackets: [],
		majorVersion, minorVersion,
		[majorVersion]: {
			...packets[gameID].majorVersion,
			[minorVersion]: packet
		}
	};
	//Update game object
	//In DEV mode, we make sure that our game JSON isn't changing between ticks
	checkGameJSON(gameID);
	games[gameID] = {
		...games[gameID],
		info: {
			...games[gameID].info,
			...info
		},
		players: {
			...games[gameID].players,
			...players
		},
		leaderboard: {
			...games[gameID].leaderboard,
			...leaderboard
		},
		gameData: {
			...games[gameID].gameData,
			...gameData
		},
		banList: {
			...games[gameID].banList,
			...banList
		}
	};
	saveGameJSON(gameID);
};
exports.getPacketVersion = (gameID) => {
	let { majorVersion, minorVersion } = packets[gameID];
	return {
		majorVersion,
		minorVersion
	};
};
exports.getLatestPacket = (gameID) => {
	let { majorVersion, minorVersion } = packets[gameID];
	return {
		majorVersion,
		minorVersion,
		packet: packets[gameID][majorVersion][minorVersion]
	}
};

exports.doesPasswordMatch = (gameID, password) => {
	console.log("PWD CHECK:", "ser:", games[gameID].info.password, "cli:", password);
	return games[gameID].info.password === password;
};
exports.isGameNameTaken = (wantedName) => {
	let taken = false;
	Object.keys(games).map( gameID => {
		let { name } = games[gameID].info;
		if (name === wantedName) taken = true;
	});
	return taken;
};
exports.gameExists = (gameID) => {
	return (gameID in games);
};
exports.getGameIDs = () => {
	return Object.keys(games);
};

exports.addPlayerToGame = (gameID, player) => {
	exports.editGame(gameID, {
		info: {
			playerCount: games[gameID].info.playerCount + 1
		},
		players: {
			[player.id]: player
		}
	});
};
exports.updatePlayerInGame = (gameID, playerID, data) => {
	exports.editGame(gameID, {
		players: {
			[playerID]: {
				...data
			}
		}
	});
};
exports.getGameByPlayerID = (playerID) => {
	let gameID = players[playerID].gameID;
	return exports.getGame(gameID);
};


exports.addPlayer = (player) => {
	players[player.id] = {
		...player
	};
};
exports.getPlayer = (id) => {
	return {
		...players[id]
	};
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

exports.resetPlayer = (id) => {
	exports.editPlayer(id, {
		gameID: null
	});
};
exports.getPlayerBySocket = (socket) => {
	return exports.getPlayer(socket.id);
};
exports.getPlayerIDBySocket = (socket) => {
	return socket.id;
};


/*
	DEV / USELESS STUFF
 */

exports.load = async function() {
	//console.time("loadState");
	await storage.init();

	let state;
	state = await storage.getItem("state")
		.then( data => data)
		.catch( err => console.log("err", err));

	//console.timeEnd("loadState");
	return state;
};
exports.save = async function(state) {
	//console.time("saveState");
	await storage.init();
	await storage.setItem("state", state);
	//console.timeEnd("saveState");
};

let stringifyGame = (gameID) => JSON.stringify(games[gameID]);

let checkGameJSON = (gameID) => {
	if (
		process.env.NODE_ENV !== "production" &&
		gameID in saves
	) {
		if (stringifyGame(gameID) !== saves[gameID]) {
			console.log("SOMETHING CHANGED THE GAME OBJECT");
			console.log("old Object", saves[gameID]);
			console.log("new Object", stringifyGame(gameID));
		}
	}
};
let saveGameJSON = (gameID) => {
	if (process.env.NODE_ENV !== "production") {
		saves[gameID] = JSON.stringify(games[gameID]);
	}
};
exports.test = {
	packets,
	players,
	makeNewPacket,
	combinePackets,
	combineObjects,
	shouldNewMajorVersion,
	applyPacket,
	stringifyGame,
	checkGameJSON,
	saveGameJSON
};