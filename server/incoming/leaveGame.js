let state = require("../state");

module.exports = socket => {
  let playerID = state.getPlayerIDBySocket(socket);
  let gameID = state.getGameIDByPlayerID(playerID);

  socket.leave(gameID);
  state.resetPlayer(playerID);
  if (gameID) {
    socket.leave(gameID);
    state.updatePlayerGameData(gameID, playerID, {
      inGame: false
    });
  }
};
