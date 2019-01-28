let state = require("../state");

let { startPreRace } = require("./handleStatusChange");

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
