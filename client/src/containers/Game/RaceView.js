import React from "react";
import { connect } from "react-redux";
import PT from "prop-types";

import Icon from "../../components/Other/Icon";

let Racer = ({ progress, wpm, greyed, name, icon }) => (
  <div className="RacerContainer">
    <div className="Lane">
      <div className="Racer">
        <div className="Name">{name}</div>
        <Icon {...icon} greyed={greyed} />
      </div>
    </div>
    <div className="Wpm">{wpm + " WPM"}</div>
  </div>
);
Racer.propTypes = {
  progress: PT.number.isRequired,
  wpm: PT.number.isRequired,
  greyed: PT.bool.isRequired,
  name: PT.string.isRequired,
  icon: PT.shape({
    type: PT.string.isRequired,
    primary: PT.string.isRequired,
    secondary: PT.string.isRequired
  }).isRequired
};

let RaceView = ({ racers }) => (
  <div className="RaceView">
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

  let { status, numChars } = info;

  let isLobby = status === "LOBBY";

  let racers = Object.keys(gameData)
    .filter(key => typeof gameData[key] === "object")
    .sort((a, b) => a - b)
    .map(key => {
      let { currChar, readyUp } = gameData[key];
      let { name, icon } = players[key];

      let progress = currChar / numChars;
      let wpm = 0;
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
