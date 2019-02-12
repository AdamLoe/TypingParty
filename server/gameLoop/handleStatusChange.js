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
      numChars: string.length,
      timeLeft: time
    },
    gameData: {}
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
      timeStart: Date.now(),
      timeEnd: Date.now() + time * 1000,
      status: "RACE",
      hasRaceStarted: true,
      numFinished: 0,
      timeLeft: time
    }
  });
};

let tourneyFinished = gameID => {
  let game = state.getGame(gameID);

  state.loopUpdatePlayersInGameData(gameID, (player, playerID) => {
    return {
      score: 0
    };
  });
  state.editGame(gameID, {
    info: {
      currGame: 0,
      status: "LOBBY"
    }
  });
};

// Increase Game #
// Only Last Game #, Start Over
exports.endRace = gameID => {
  let game = state.getGame(gameID);

  let { currGame, maxGames } = game.info;

  currGame += 1;
  if (currGame > maxGames) {
    tourneyFinished(gameID);
  } else {
    state.editGame(gameID, {
      info: {
        currGame,
        status: "LOBBY"
      }
    });
  }
};
