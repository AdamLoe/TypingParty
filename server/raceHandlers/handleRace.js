let state = require("../state");

let startRace = require("./startRace");
let endRace = require("./endRace");

let updateTime = require("../helpers/updateTime");
let setProgress = require("./setProgress");
let scoreSaveRace = require("./scoreSaveRace");
let checkEnded = require("./checkEnded");

let raceStarted = gameID => {
  setProgress(gameID);
  if (checkEnded(gameID)) {
    scoreSaveRace(gameID);
    endRace(gameID);
  }
};

let raceCounting = gameID => {
  let isTimeOver = updateTime(gameID) < 0;

  if (isTimeOver) startRace(gameID);
};

module.exports = gameID => {
  let { hasRaceStarted } = state.getGame(gameID).info;

  if (hasRaceStarted) raceStarted(gameID);
  else raceCounting(gameID);
};
