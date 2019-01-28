let state = require("../state");

let handleInactive = gameID => {
  let game = state.getGame(gameID);

  //Check inactive players
  //Check Empty Games
  //We need to be able to mark players as inactive
  //Inactive players should be eventually kicked
  //We could just give them a join button
  //Would allow them to still look at the game
  //But not take up readyUp/finishedPlayers/maxPlayers slots
  //Very important, users should not
};

module.exports = () => {
  state.getGameIDs().map(gameID => {
    handleInactive(gameID);
  });
};
