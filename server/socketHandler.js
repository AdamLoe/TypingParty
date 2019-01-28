let { startSocket, getSocket } = require("./socket");

let initiatePlayer = require("./incoming/initiatePlayer");

let playerUpdate = require("./incoming/playerUpdate");
let profileUpdate = require("./incoming/profileUpdate");
let leaveGame = require("./incoming/leaveGame");
let joinGame = require("./incoming/joinGame");
let createGame = require("./incoming/createGame");
let getBrowser = require("./incoming/getBrowser");
let sendMessage = require("./incoming/sendMessage");
let getPacket = require("./incoming/getPacket");
let getGameObject = require("./incoming/getGameObject");

let handleGames = require("./gameLoop/handleGames");
let handleInactive = require("./gameLoop/handleInactive");

exports.socketHandler = async function(server) {
  startSocket(server);
  let io = getSocket();

  io.on("connection", function(socket) {
    initiatePlayer(socket);
    console.log("client:", socket.id);

    socket.on("playerGameUpdate", data => playerUpdate(socket, data));
    socket.on("profileUpdate", data => profileUpdate(socket, data));
    socket.on("leaveGame", gameID => leaveGame(socket, gameID));
    socket.on("joinGame", data => joinGame(socket, data));
    socket.on("createGame", data => createGame(socket, data));
    socket.on("getBrowser", filters => getBrowser(socket, filters));
    socket.on("sendMessage", message => sendMessage(socket, message));
    socket.on("getPacket", data => getPacket(socket, data));
    socket.on("getGameObject", () => getGameObject(socket));
  });

  let gameIntervalLength = 1000 / 10;
  let inactiveIntervalLength = 1000;

  setInterval(handleGames, gameIntervalLength);
  setInterval(handleInactive, inactiveIntervalLength);
};
