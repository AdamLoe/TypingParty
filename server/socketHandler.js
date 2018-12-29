let { startSocket, getSocket } = require("./socket");

let initiatePlayer = require("./incoming/initiatePlayer");
let handleGames = require("./gameLoop/handleGames");
let playerUpdate = require("./incoming/playerUpdate");
let getBrowser = require("./incoming/getBrowser");
let createGame = require("./incoming/createGame");
let joinGame = require("./incoming/joinGame");
let leaveGame = require("./incoming/leaveGame");
let handleMessage = require("./incoming/handleMessage");

exports.socketHandler = async function(server) {
	startSocket(server);
	let io = getSocket();

	io.on("connection", function(socket ) {
		initiatePlayer(socket);
		console.log("client:", socket.id);

		socket.on("getBrowser", (filters) => getBrowser(socket, filters));
		socket.on("leaveGame", (gameID) => leaveGame(socket, gameID));
		socket.on("joinGame", (data) => joinGame(socket, data));
		socket.on("createGame", (data) => createGame(socket, data));
		socket.on("playerUpdate", (data) => playerUpdate(socket, data));
		socket.on("sendMessage", (message) => handleMessage(socket, message));
	});

	setInterval(handleGames, 3000);
};

/*


		//console.log( socket.handshake.address );
		//console.log( socket.request.connection.remoteAddress );
		socket.on("new player", function() {
			createNewPlayer( socket.id, players );
		});

		socket.on("movement", function(data) {
			handleMovement(data, players, socket.id);
		});

	setInterval(function() {
		io.sockets.emit("state", players);
	}, 2000);

	setInterval(function() {
		stateHandler.save( players);
	}, 5000);

 */




