let state = require("../state");
let getGameObject = require("./getGameObject");
let profileUpdate = require("./profileUpdate");

let doesGameExist = game => {
  return game !== undefined;
};
let gameHasRoom = game => {
  return game.info.playerCount < game.info.maxPlayers;
};
let isUserBanned = (game, playerID) => {
  let { banList } = game;
  return playerID in banList;
};

let joinError = (socket, message) => {
  console.log("JOINERROR:", message);
  socket.emit("Error", {
    errorType: "JOINING",
    message
  });
};

//Here is where we send the data
let joinGame = (socket, game, playerID) => {
  let player = state.getPlayer(playerID);
  console.log(player.id, "joining", game.id);

  socket.leave(player.gameID);
  socket.join(game.id);

  state.addPlayerToGame(game.id, player);
  state.editPlayer(player.id, {
    gameID: game.id
  });
  getGameObject(socket, game.id);
};

module.exports = async (socket, { gameID, password, name, icon }) => {
  profileUpdate(socket, { name, icon });
  let playerID = state.getPlayerIDBySocket(socket);
  let game = state.getGame(gameID);

  if (!doesGameExist(game)) {
    joinError(socket, "Game does not exist anymore");
  } else if (!gameHasRoom(game)) {
    joinError(socket, "Game is full");
  } else if (!state.doesPasswordMatch(gameID, password)) {
    joinError(socket, "Password does not match");
  } else if (isUserBanned(game, playerID)) {
    joinError(socket, "You are banned");
  } else {
    joinGame(socket, game, playerID);
  }
};
