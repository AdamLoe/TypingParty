import React from "react";
import { connect } from "react-redux";
import PT from "prop-types";

import CountdownPopup from "./CountdownPopup";
import EndRacePopup from "./EndRacePopup";

let RacePopups = ({
  showCountdown,
  timeLeft,
  hasRaceStarted,
  showRaceEnd,
  isTourneyOver
}) => (
  <div className="RacePopup">
    {showCountdown && (
      <CountdownPopup timeLeft={timeLeft} hasRaceStarted={hasRaceStarted} />
    )}
    {showRaceEnd && <EndRacePopup isTourneyOver={isTourneyOver} />}
  </div>
);

RacePopups.propTypes = {
  showCountdown: PT.bool.isRequired,
  timeLeft: PT.number.isRequired,
  hasRaceStarted: PT.bool.isRequired,
  showRaceEnd: PT.bool.isRequired,
  isTourneyOver: PT.bool
};

let isNotFirstTourney = gameData => {
  return true;
};

let mapState = state => {
  let { info, gameData } = state.game;
  let { status, timeLeft, hasRaceStarted, currGame } = info;

  let showCountdown = status === "RACE";
  let showRaceEnd = status === "LOBBY";
  let isTourneyOver = currGame === 0;

  return {
    showCountdown,
    timeLeft,
    hasRaceStarted,
    showRaceEnd,
    isTourneyOver
  };
};

export default connect(
  mapState,
  {}
)(RacePopups);
