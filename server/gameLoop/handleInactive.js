let state = require("../state");
let deleteGame = require("./deleteGame");

let inactiveSeconds = 10;

let setPlayersInactive = gameID => {
  let { players, gameData } = state.getGame(gameID);

  let activePlayers = 0;
  let playerCount = 0;

  Object.keys(players).map(playerID => {
    let { lastActive, isActive } = state.getPlayerActivity(playerID);
    let { inGame } = gameData[playerID];

    if (inGame) {
      let shouldBeActive = lastActive + inactiveSeconds * 1000 > Date.now();
      if (isActive !== shouldBeActive) {
        isActive = !isActive;

        state.updatePlayerGameData(gameID, playerID, { isActive });
        state.editPlayer(playerID, { isActive });
      }
      if (isActive) activePlayers += 1;
      playerCount += 1;
    }
  });

  return {
    activePlayers,
    playerCount
  };
};

let deleteGameTimer = 20;
let handleInactiveGame = gameID => {
  let { activePlayers, lastActive, playerCount } = state.getGame(gameID).info;
  let {
    activePlayers: newActivePlayers,
    playerCount: newPlayerCount
  } = setPlayersInactive(gameID);

  let playerCountChanged = playerCount !== newPlayerCount;
  let activePlayersChanged = activePlayers !== newActivePlayers;
  let noActivePlayers = newActivePlayers === 0;

  let gameNotActive = lastActive + deleteGameTimer * 1000 < Date.now();
  let isGameDead = noActivePlayers && gameNotActive;

  if (playerCountChanged) {
    state.editGame(gameID, {
      info: {
        playerCount: newPlayerCount
      }
    });
  }
  if (activePlayersChanged) {
    state.editGame(gameID, {
      info: {
        activePlayers: newActivePlayers
      }
    });
  }

  if (activePlayers > 0) {
    state.editGame(gameID, {
      info: {
        lastActive: Date.now()
      }
    });
  }
  if (isGameDead) {
    deleteGame(gameID);
  }
};

module.exports = () => {
  state.getGameIDs().map(gameID => {
    handleInactiveGame(gameID);
  });
};
