let state = require("../state");

let handleFinished = require("./handleFinished");
let updateTime = require("./updateTime");
let { startRace, endRace } = require("./handleStatusChange");

module.exports = gameID => {
  let { hasRaceStarted } = state.getGame(gameID).info;

  let timeLeft = updateTime(gameID);
  let isTimeOver = timeLeft < 0;

  if (hasRaceStarted) {
    handleFinished(gameID);
  }
  if (isTimeOver && hasRaceStarted) endRace(gameID);
  if (isTimeOver && !hasRaceStarted) startRace(gameID);
};
