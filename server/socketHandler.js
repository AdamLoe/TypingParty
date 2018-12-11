let { startSocket, getSocket } = require("./socket");
let {
	initiatePlayer, gotoRace, gotoMenu, playerUpdate
} = require("./incomingConnections");
let handleGames = require("./gameLoop/handleGames");


exports.socketHandler = async function(server) {
	startSocket(server);
	let io = getSocket();

	io.on("connection", function(socket ) {
		initiatePlayer(socket);

		socket.on("gotoMenu", () => gotoMenu(socket));
		socket.on("gotoRace", () => gotoRace(socket));
		socket.on("playerUpdate", (data) => playerUpdate(data, socket));
	});

	setInterval(handleGames, 500);
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




