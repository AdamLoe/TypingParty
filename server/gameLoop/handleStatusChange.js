let state = require("../state");

exports.startRace = gameID => {
  let time = 10;
  state.editGame(gameID, {
    info: {
      timeEnd: Date.now() + time * 1000,
      status: "RACE",
      hasRaceStarted: true
    },
    gameData: {
      timeLeft: time
    }
  });
};

exports.endRace = gameID => {
  state.editGame(gameID, {
    info: {
      status: "LOBBY"
    }
  });
};
