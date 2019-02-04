let state = require("../state");

module.exports = socket => {
  let playerID = state.getPlayerIDBySocket(socket);

  let { gameID } = state.getPlayer(playerID);
  state.updatePlayerGameData(gameID, playerID, {
    isActive: false
  });
  socket.leave(gameID);
  state.resetPlayer();
};

exports.gotoMenu = socket => {
  console.log("SERVER GOING TO MENU");
  let { gameID } = state.getPlayer(socket.id);
  socket.leave(gameID);
  state.resetPlayer(socket.id);
};
