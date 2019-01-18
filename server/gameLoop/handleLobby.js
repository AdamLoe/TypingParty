let state = require("../state");

let getString = require("../strings");
let startPreRace = gameID => {
  let time = 10;
  let string = getString();
  state.editGame(gameID, {
    info: {
      timeEnd: Date.now() + time * 1000,
      status: "RACE",
      hasRaceStarted: false,
      string,
      numChars: string.length
    },
    gameData: {
      timeLeft: time
    }
  });
  state.loopUpdatePlayersInGameData(gameID, (player, playerID) => {
    return {
      place: false,
      finished: false,
      currChar: 0,
      readyUp: false
    };
  });
};

let neededReadyPercentage = 0.66;
module.exports = gameID => {
  let readied = 0;
  let notReadied = 0;

  state.loopPlayersInGameData(gameID, (player, playerID) => {
    if (player.readyUp) readied += 1;
    else notReadied += 1;
  });

  let percent = readied / (readied + notReadied);
  if (percent > neededReadyPercentage) {
    startPreRace(gameID);
  }
};
