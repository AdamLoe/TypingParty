import React from "react";
import { connect } from "react-redux";
import PT from "prop-types";

let GameMiniDetail = ({ description, value }) => (
  <div className={"smallDetail " + description}>
    <div className="description">{description}</div>
    <div className="value">{value}</div>
  </div>
);
GameMiniDetail.propTypes = {
  description: PT.string.isRequired,
  value: PT.string.isRequired
};

let GameDetails = ({
  name,
  playerCount,
  maxPlayers,
  currGame,
  maxGames,
  status,
  timeLeft
}) => (
  <div className="GameDetails">
    <div className="GameName">{name}</div>
    <GameMiniDetail
      description="Players"
      value={playerCount + "/" + maxPlayers}
    />
    <GameMiniDetail description="Game#" value={currGame + "/" + maxGames} />
    <GameMiniDetail description="Status" value={timeLeft} />
  </div>
);
GameDetails.propTypes = {
  name: PT.string.isRequired,
  playerCount: PT.number.isRequired,
  maxPlayers: PT.number.isRequired,
  currGame: PT.number.isRequired,
  maxGames: PT.number.isRequired,
  status: PT.string.isRequired,
  timeLeft: PT.number.isRequired
};
let mapState = state => {
  let {
    name,
    playerCount,
    maxPlayers,
    currGame,
    maxGames,
    status,
    timeLeft
  } = state.game.info;
  return {
    name,
    playerCount,
    maxPlayers,
    currGame,
    maxGames,
    status,
    timeLeft
  };
};

export default connect(
  mapState,
  {}
)(GameDetails);
