let state = require("../state");

let kickPlayer = require("../helpers/kickPlayer");

// I maybe should update wpm for everyone each tick

let lobbyUpdate = ({ socket, readyUp }) => {
  let playerID = state.getPlayerIDBySocket(socket);
  let gameID = state.getGameIDByPlayerID(playerID);
  state.updatePlayerGameData(gameID, playerID, {
    readyUp
  });
};

let raceUpdate = ({ socket, currChar }) => {
  let playerID = state.getPlayerIDBySocket(socket);
  let game = state.getGameByPlayerID(playerID);

  if (game !== undefined) {
    let { string, numChars } = game.info;

    let hasFinished = currChar >= numChars;
    state.updatePlayerGameData(game.id, socket.id, {
      finished: hasFinished ? Date.now() : false,
      currChar
    });
  } else {
    kickPlayer(socket, "Server dead");
  }
};

module.exports = (socket, data) => {
  let { readyUp, currWord } = data;
  if (readyUp !== undefined) {
    lobbyUpdate({ socket, readyUp });
  }
  if (currWord !== undefined) {
    raceUpdate({ socket, currWord });
  }
};
