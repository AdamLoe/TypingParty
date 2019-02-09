let state = require("../state");

module.exports = socket => {
  let playerID = state.getPlayerIDBySocket(socket);
  let gameID = state.getGameIDByPlayerID(playerID);

  let isValid = gameID !== null;

  if (!isValid) {
    socket.emit("serverError", {
      errorType: "GAMECLOSED",
      message: "Game no longer exists."
    });
  }

  return isValid;
};
