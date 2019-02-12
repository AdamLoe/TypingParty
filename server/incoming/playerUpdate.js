let state = require("../state");

let checkInValidGame = require("./checkInValidGame");

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

  let { string, numChars } = game.info;

  let hasFinished = currChar >= numChars;
  state.updatePlayerGameData(game.id, socket.id, {
    currChar,
    ...(hasFinished && { finished: Date.now() })
  });
};

module.exports = (socket, data) => {
  if (checkInValidGame(socket)) {
    let { readyUp, currChar } = data;
    if (readyUp !== undefined) {
      lobbyUpdate({ socket, readyUp });
    }
    if (currChar !== undefined) {
      raceUpdate({ socket, currChar });
    }
  }
};
