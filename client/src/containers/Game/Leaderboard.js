import React from "react";
import { connect } from "react-redux";
import PT from "prop-types";

import Icon from "../../components/Other/Icon";

let PlayerScore = ({ name, icon, score, place }) => (
  <div className="PlayerScore">
    <div className="Place">{place}</div>
    <div className="Player">
      <div className="Name">{name}</div>
      <Icon {...icon} />
    </div>
    <div className="Score">{score}</div>
  </div>
);
PlayerScore.propTypes = {
  name: PT.string.isRequired,
  icon: PT.shape({
    type: PT.string.isRequired,
    primary: PT.string.isRequired,
    secondary: PT.string.isRequired
  }).isRequired,
  score: PT.number.isRequired,
  place: PT.number.isRequired
};

let Leaderboard = ({ leaderboard }) => (
  <div className="Leaderboard">
    {leaderboard.map(({ id, score, name, icon }, index) => (
      <PlayerScore
        key={id}
        score={score}
        name={name}
        icon={icon}
        place={index}
      />
    ))}
  </div>
);

Leaderboard.propTypes = {
  leaderboard: PT.arrayOf(
    PT.shape({
      id: PT.string.isRequired,
      score: PT.number.isRequired,
      name: PT.string.isRequired,
      icon: PT.object.isRequired
    })
  )
};

let mapState = state => {
  let { gameData, players } = state.game;

  let leaderboard = [];

  Object.keys(players)
    .filter(playerID => playerID in gameData)
    .map(playerID =>
      leaderboard.push({
        id: playerID,
        score: gameData[playerID].score,
        ...players[playerID]
      })
    );

  leaderboard.sort((a, b) => a.score - b.score);

  console.log(gameData, players);
  console.log(leaderboard);
  return {
    leaderboard
  };
};

export default connect(
  mapState,
  {}
)(Leaderboard);
