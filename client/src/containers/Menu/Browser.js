import React from "react";
import { connect } from "react-redux";
import PT from "prop-types";

import BrowserItem from "../../components/BrowserItem";

import { joinGame } from "../../actions/api";

let Header = () => (
  <div className="BrowserHeader">
    <div className="BrowserColumn ColumnLarge"> Name </div>
    <div className="BrowserColumn ColumnSmall"> Status</div>
    <div className="BrowserColumn ColumnSmall"> Players </div>
    <div className="BrowserColumn ColumnSmall"> Games </div>
    <div className="BrowserColumn ColumnMedium"> Scoring Type</div>
    <div className="BrowserColumn ColumnMedium"> Handicaps </div>
  </div>
);

let BrowserEmptyFiller = () => (
  <div className="BrowserItem BrowserEmpty">Nobody's playing right now :(</div>
);

let Browser = ({ games, joinGame, isBrowserEmpty }) => (
  <div className="Browser">
    <Header />
    {isBrowserEmpty && <BrowserEmptyFiller />}
    {games.map(game => (
      <BrowserItem key={game.id} joinGame={joinGame} {...game} />
    ))}
  </div>
);
Browser.propTypes = {
  games: PT.arrayOf(
    PT.shape({
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
  isBrowserEmpty: PT.bool.isRequired,
  joinGame: PT.func.isRequired
};

let mapState = state => {
  let { games } = state.browser;
  games.sort((a, b) => b.created - a.created);
  let isBrowserEmpty = games.length === 0;
  return {
    games,
    isBrowserEmpty
  };
};

export default connect(
  mapState,
  { joinGame }
)(Browser);
