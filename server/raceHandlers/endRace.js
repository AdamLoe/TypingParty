let state = require("../state");

let tourneyFinished = gameID => {
  let game = state.getGame(gameID);

  state.loopUpdatePlayersInGameData(gameID, (player, playerID) => {
    return {
      score: 0
    };
  });
  state.editGame(gameID, {
    info: {
      currGame: 0,
      status: "LOBBY"
    }
  });
};

module.exports = gameID => {
  let game = state.getGame(gameID);

  let { currGame, maxGames } = game.info;

  currGame += 1;
  if (currGame > maxGames) {
    tourneyFinished(gameID);
  } else {
    state.editGame(gameID, {
      info: {
        currGame,
        status: "LOBBY"
      }
    });
  }
};
