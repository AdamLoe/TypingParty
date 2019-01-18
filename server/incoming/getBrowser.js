let state = require("../state");

let getGameInfo = game => {
  let {
    name,
    scoringType,
    handicaps,
    maxPlayers,
    playerCount,
    maxGame,
    currGame,
    status,
    created
  } = game.info;
  return {
    id: game.id,
    name,
    status,
    created,
    scoringType,
    handicaps,
    maxPlayers,
    playerCount,
    maxGame,
    currGame
  };
};

let getGames = filters => {
  let gameIDs = state.getGameIDs();

  return gameIDs.map(gameID => {
    let game = state.getGame(gameID);

    return getGameInfo(game);
  });
};

module.exports = (socket, filters) => {
  let gameArr = getGames(filters);
  socket.emit("updateBrowserData", gameArr);
};
