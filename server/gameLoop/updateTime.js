let state = require("../state");

module.exports = gameID => {
  let game = state.getGame(gameID);
  let { timeEnd } = game.info;

  let oldTimeLeft = game.gameData.timeLeft;
  let timeLeft = Math.floor((timeEnd - Date.now()) / 1000);

  if (oldTimeLeft !== timeLeft) {
    state.editGame(gameID, {
      gameData: {
        timeLeft
      }
    });
  }
  return timeLeft;
};
