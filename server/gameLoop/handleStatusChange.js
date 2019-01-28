let state = require("../state");

let getString = require("../strings");

exports.startPreRace = gameID => {
  let time = 10;
  let string = getString();
  state.editGame(gameID, {
    info: {
      timeStart: Date.now(),
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

exports.startRace = gameID => {
  let time = 1000;
  state.editGame(gameID, {
    info: {
      timeEnd: Date.now() + time * 1000,
      status: "RACE",
      hasRaceStarted: true,
      numFinished: 0
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
