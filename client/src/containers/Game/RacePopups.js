import React from "react";
import { connect } from "react-redux";
import PT from "prop-types";

import CountdownPopup from "./CountdownPopup";
import EndTourneyPopup from "./EndRacePopup";
import EndRacePopup from "./EndRacePopup";

let RacePopups = ({
  showCountdown,
  timeLeft,
  hasRaceStarted,
  showRaceEnd,
  showTourneyEnd
}) => {
  let Popup = null;

  if (showCountdown)
    Popup = (
      <CountdownPopup timeLeft={timeLeft} hasRaceStarted={hasRaceStarted} />
    );
  if (showRaceEnd) Popup = <EndRacePopup />;
  if (showTourneyEnd) Popup = <EndTourneyPopup />;

  if (showCountdown || showRaceEnd || showTourneyEnd) {
    return <div className="RacePopup">{Popup}</div>;
  } else {
    return <></>;
  }
};

RacePopups.propTypes = {
  showCountdown: PT.bool.isRequired,
  timeLeft: PT.number.isRequired,
  hasRaceStarted: PT.bool.isRequired,
  showRaceEnd: PT.bool.isRequired,
  showTourneyEnd: PT.bool.isRequired
};

let isNotFirstTourney = gameData => {
  return true;
};

let mapState = state => {
  let { info, gameData } = state.game;
  let { status, timeLeft, hasRaceStarted, currGame } = info;

  let showCountdown = status === "RACE";
  let showRaceEnd = status === "LOBBY" && currGame !== 1;
  let showTourneyEnd =
    status === "LOBBY" && currGame === 1 && isNotFirstTourney(gameData);

  return {
    timeLeft,
    showCountdown,
    showRaceEnd,
    showTourneyEnd,
    hasRaceStarted
  };
};

export default connect(
  mapState,
  {}
)(RacePopups);
