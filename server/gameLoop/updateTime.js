let state = require("../state");

module.exports = gameID => {
  let game = state.getGame(gameID);
  let { timeEnd, timeLeft } = game.info;

  let newTimeLeft = Math.floor((timeEnd - Date.now()) / 1000);

  if (newTimeLeft !== timeLeft) {
    state.editGame(gameID, {
      info: {
        timeLeft: newTimeLeft
      }
    });
  }
  return newTimeLeft;
};
