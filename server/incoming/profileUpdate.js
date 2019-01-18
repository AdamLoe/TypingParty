let state = require("../state");

//This is where name validation goes
module.exports = (socket, { name, icon }) => {
  let playerID = state.getPlayerIDBySocket(socket);
  let data = {
    name,
    icon
  };

  state.editPlayer(playerID, data);

  let gameID = state.getGameIDByPlayerID(playerID);
  if (gameID)
    state.updatePlayerInfoInGame({
      gameID,
      playerID,
      data
    });
};
