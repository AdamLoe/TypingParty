let state = require("../state");

module.exports = gameID => {
  let time = 100;
  state.editGame(gameID, {
    info: {
      hasRaceStarted: true,

      timeLeft: time,
      timeStart: Date.now(),
      timeEnd: Date.now() + time * 1000
    }
  });
};
