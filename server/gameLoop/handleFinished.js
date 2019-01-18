let state = require("../state");

let getFinishedPlayers = gameData =>
  Object.keys(gameData)
    .filter(playerID => gameData[playerID].finished)
    .map(playerID => gameData[playerID]);

let checkAlreadyFinished = (finished, gameData) =>
  finished.filter(player => !gameData[player.id].finished);

let sortFinishedPlayers = finished =>
  finished.sort((p1, p2) => p1.finished - p2.finished);

module.exports = gameID => {
  let game = state.getGame(gameID);
  let packet = state.combinePackets(gameID);

  if (packet.gameData) {
    let { finished } = game.gameData;

    let finishedPlayers = getFinishedPlayers(packet.gameData);
    finishedPlayers = checkAlreadyFinished(finishedPlayers, game.gameData);
    finishedPlayers = sortFinishedPlayers(finishedPlayers);

    if (finishedPlayers.length > 0) {
      //Users should know if someone finished, but we don't normally set gameData to major
      state.setNextPacketMajor(gameID);
      state.editGame(gameID, {
        gameData: {
          finished: finished + finishedPlayers.length
        }
      });
      finishedPlayers.map((player, index) => {
        state.editGame(gameID, {
          gameData: {
            playerID: {
              finished: finished + index + 1
            }
          }
        });
      });
    }
  }
};
