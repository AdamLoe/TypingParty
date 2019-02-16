import React from "react";
import { connect } from "react-redux";
import PT from "prop-types";

import Racer from "../../components/Game/Racer";

let RaceView = ({ children, racers }) => (
  <div className="RaceView">
    {children}
    {racers.map(({ id, progress, wpm, greyed, name, icon }) => (
      <Racer
        key={id}
        progress={progress}
        wpm={wpm}
        greyed={greyed}
        name={name}
        icon={icon}
      />
    ))}
  </div>
);
RaceView.propTypes = {
  children: PT.node,
  racers: PT.arrayOf(
    PT.shape({
      id: PT.string.isRequired,
      progress: PT.number.isRequired,
      wpm: PT.number.isRequired,
      greyed: PT.bool.isRequired,
      name: PT.string.isRequired,
      icon: PT.shape({
        type: PT.string.isRequired,
        primary: PT.string.isRequired,
        secondary: PT.string.isRequired
      }).isRequired
    }).isRequired
  ).isRequired
};

let mapState = state => {
  let { gameData, players, info } = state.game;

  let { status, numChars, timeStart, timeEnd, timeLeft } = info;

  let timeTotal = (timeEnd - timeStart) / 1000;
  let timeElapsed = timeTotal - timeLeft;
  let minElapsed = timeElapsed / 60;

  let isLobby = status === "LOBBY";

  let racers = Object.keys(gameData)
    .filter(key => typeof gameData[key] === "object")
    .sort((a, b) => a - b)
    .map(key => {
      let { currChar, readyUp } = gameData[key];
      let { name, icon } = players[key];

      let progress = (100 * currChar) / numChars;

      let wordsTyped = currChar / 5;
      let wpm = Math.floor(wordsTyped / minElapsed);

      let greyed = isLobby && !readyUp;

      return {
        id: key,
        name,
        icon,
        progress,
        wpm,
        greyed
      };
    });
  return {
    racers
  };
};

export default connect(
  mapState,
  {}
)(RaceView);
