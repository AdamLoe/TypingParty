let state = require("../state");

//Upon game close, remove all players
let derefPlayers = gameID => {
  let game = state.getGame(gameID);
  for (let playerID in game.players) {
    let player = state.getPlayer(playerID);
    if (player !== undefined) {
      if (player.gameID === game.id) {
        state.editPlayer(playerID, {
          gameID: null
        });
      }
    }
  }
};

module.exports = gameID => {
  console.log("ENDING GAME", gameID);
  derefPlayers(gameID);
  state.removeGameByID(gameID);
};
