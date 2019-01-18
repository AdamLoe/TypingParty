import React from "react";
import { connect } from "react-redux";
import PT from "prop-types";

import { readyUp } from "../../actions";
import { gotoMenu } from "../../actions";

let LobbyMenu = ({ isReadiedUp, readyUp, gotoMenu }) => (
  <div className="LobbyMenu">
    <button onClick={() => readyUp(!isReadiedUp)}>Ready Up</button>
    <button onClick={gotoMenu}>Leave Game</button>
  </div>
);

LobbyMenu.propTypes = {
  readyUp: PT.func.isRequired,
  gotoMenu: PT.func.isRequired,
  isReadiedUp: PT.bool.isRequired
};

let mapState = state => ({
  isReadiedUp: state.game.isReadiedUp
});
export default connect(
  mapState,
  { readyUp, gotoMenu }
)(LobbyMenu);
