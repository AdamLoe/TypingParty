import React from "react";
import { connect } from "react-redux";
import PT from "prop-types";

import BrowserItem from "../../components/BrowserItem";

import { joinGame } from "../../actions/api";

let Browser = ({ games, joinGame }) => (
  <div className="Browser">
    Browser
    {games.map(game => (
      <BrowserItem joinGame={joinGame} {...game} />
    ))}
  </div>
);
Browser.propTypes = {
  games: PT.arrayOf(
    PT.objectOf({
      id: PT.number.isRequired,
      name: PT.string.isRequired,
      status: PT.string.isRequired,
      created: PT.number.isRequired,
      scoringType: PT.string.isRequired,
      handicaps: PT.string.isRequired,
      playerCount: PT.number.isRequired,
      maxPlayers: PT.number.isRequired,
      currGame: PT.number.isRequired,
      maxGames: PT.number.isRequired
    })
  ),
  joinGame: PT.func.isRequired
};

let mapState = state => {
  let { games } = state.browser;
  games.sort((a, b) => b.created - a.created);
  return {
    games
  };
};

export default connect(
  mapState,
  { joinGame }
)(Browser);
