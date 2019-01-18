let state = require("../state");

module.exports = socket => {
  let playerID = state.getPlayerIDBySocket(socket);
  let game = state.getGameByPlayerID(playerID);
  let { majorVersion, minorVersion } = state.getCurrentPacketVersion(game.id);

  socket.emit("updateGameObject", {
    majorVersion,
    minorVersion,
    game: game
  });
};
