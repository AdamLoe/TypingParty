let state = require("../state");

let inactiveSeconds = 60;

let setPlayersInactive = gameID => {
  let { players } = state.getGame(gameID);

  Object.keys(players).map(playerID => {
    let { lastActive, isActive } = state.getPlayerActivity(playerID);

    let shouldBeActive = lastActive < Date.now() + inactiveSeconds * 1000;
    if (isActive !== shouldBeActive) {
      isActive = !isActive;
      state.updatePlayerGameData(gameID, playerID, { isActive });
      state.editPlayer(playerID, { isActive });
    }
  });
};

let handleInactiveGame = gameID => {
  let activePlayers = 0;

  state.loopPlayersInGameData(gameID, player => {
    if (player.isActive) activePlayers += 1;
  });

  if (activePlayers === 0) {
    console.log(gameID, "has no active players");
  }
};

module.exports = () => {
  state.getGameIDs().map(gameID => {
    setPlayersInactive(gameID);
    handleInactiveGame(gameID);
  });
};
