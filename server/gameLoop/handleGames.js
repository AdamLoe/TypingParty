let state = require("../state");
let { emitRoom } = require("../socket");
let handleRace = require("../raceHandlers/handleRace");
let handleLobby = require("./handleLobby");

let handleStages = gameID => {
  let { status } = state.getGame(gameID).info;
  if (status === "LOBBY") handleLobby(gameID);
  if (status === "RACE") handleRace(gameID);
};

module.exports = () => {
  state.getGameIDs().map(gameID => {
    handleStages(gameID);
    sendUpdates(gameID);
  });
};

let sendUpdates = gameID => {
  let { majorVersion, minorVersion, packet } = state.flushPackets(gameID);

  if (packet) {
    emitRoom(gameID, "updateGameData", {
      majorVersion,
      minorVersion,
      packet
    });
  }
};
