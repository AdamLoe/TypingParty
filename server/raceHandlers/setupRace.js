let state = require("../state");

let getString = require("../strings");

module.exports = gameID => {
  let time = 10;
  let string = getString();
  let gameMode = "Knockout";
  let initialModeProgress = 0;
  if (gameMode === "Knockout" || gameMode === "Breakaway") {
    initialModeProgress = 0.5;
  }
  state.editGame(gameID, {
    info: {
      status: "RACE",
      hasRaceStarted: false,
      numFinished: 0,

      timeLeft: time,
      timeStart: Date.now(),
      timeEnd: Date.now() + time * 1000,

      string,
      numChars: string.length,

      gameMode
    }
  });
  state.loopUpdatePlayersInGameData(gameID, (player, playerID) => {
    return {
      place: false,
      finished: false,
      currChar: 0,
      readyUp: false,
      progress: initialModeProgress
    };
  });
};
