let state = require("../state");

let { endRace } = require("./handleStatusChange");

let getFinishedPlayers = gameData =>
  Object.keys(gameData)
    .filter(playerID => gameData[playerID].finished)
    .map(playerID => ({
      ...gameData[playerID],
      id: playerID
    }));
let checkAlreadyFinished = (finished, gameData) => {
  return finished.filter(player => !gameData[player.id].finished);
};
let sortFinishedPlayers = finished =>
  finished.sort((p1, p2) => p1.finished - p2.finished);
let getSortedNewFinishedPlayers = (packetData, gameData) => {
  let finishedPlayers = getFinishedPlayers(packetData);
  finishedPlayers = checkAlreadyFinished(finishedPlayers, gameData);
  finishedPlayers = sortFinishedPlayers(finishedPlayers);
  return finishedPlayers;
};

module.exports = gameID => {
  let game = state.getGame(gameID);
  let packet = state.combinePackets(gameID);

  let { numFinished, activePlayers } = game.info;

  if (packet.gameData) {
    let finishedPlayers = getSortedNewFinishedPlayers(
      packet.gameData,
      game.gameData
    );
    numFinished += finishedPlayers.length;

    if (finishedPlayers.length > 0) {
      //Users should know if someone finished, but we don't normally set gameData to major
      state.setNextPacketMajor(gameID);
      state.editGame(gameID, {
        info: {
          numFinished
        }
      });
      finishedPlayers.map((player, index) => {
        state.editGame(gameID, {
          gameData: {
            [player.id]: {
              place: numFinished + index,
              score: game.gameData[player.id].score + 10
            }
          }
        });
      });
    }

    if (numFinished === activePlayers) {
      endRace(gameID);
    }
  }
};
