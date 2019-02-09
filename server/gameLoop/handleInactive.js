let state = require("../state");
let deleteGame = require("./deleteGame");

let inactiveSeconds = 60;

let setPlayersInactive = gameID => {
  let { players } = state.getGame(gameID);

  let activePlayers = 0;

  Object.keys(players).map(playerID => {
    let { lastActive, isActive } = state.getPlayerActivity(playerID);

    let shouldBeActive = lastActive < Date.now() + inactiveSeconds * 1000;
    if (isActive !== shouldBeActive) {
      isActive = !isActive;

      state.updatePlayerGameData(gameID, playerID, { isActive });
      state.editPlayer(playerID, { isActive });
    }
    if (isActive) activePlayers += 1;
  });

  return activePlayers;
};

let handleInactiveGame = gameID => {
  let { activePlayers } = state.getGame(gameID).info;
  let newActivePlayers = setPlayersInactive(gameID);

  if (activePlayers !== newActivePlayers) {
    state.editGame(gameID, {
      info: {
        activePlayers: newActivePlayers
      }
    });
  }

  if (activePlayers === 0 && newActivePlayers === 0) {
    deleteGame(gameID);
  }
};

module.exports = () => {
  state.getGameIDs().map(gameID => {
    handleInactiveGame(gameID);
  });
};
