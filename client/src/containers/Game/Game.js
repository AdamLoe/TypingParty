import React from "react";
import { connect } from "react-redux";
import PT from "prop-types";

import Messenger from "./Messenger";
import Leaderboard from "./Leaderboard";

import RaceView from "./RaceView";
import TypingController from "./TypingController";
import RacePopup from "./RacePopups";
import LobbyMenu from "./LobbyMenu";

let Game = ({ status }) => (
  <div className="Game">
    <Leaderboard />
    <div className="GameMain">
      <div className="GameView">
        <RacePopup />
        <RaceView />
      </div>
      {status === "LOBBY" ? <LobbyMenu /> : <TypingController />}
    </div>
    <Messenger />
  </div>
);
Game.propTypes = {
  status: PT.string.isRequired
};

let mapState = state => {
  let { status } = state.game.info;
  return {
    status
  };
};

export default connect(
  mapState,
  {}
)(Game);
