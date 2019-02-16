import React from "react";
import { connect } from "react-redux";
import PT from "prop-types";

import { readyUp } from "../../actions";
import { gotoMenu } from "../../actions";

let LobbyMenu = ({ isReady, readyUp, gotoMenu }) => (
  <div className="LobbyMenu">
    <button
      className={isReady ? "isReady" : ""}
      onClick={() => readyUp(!isReady)}
    >
      Ready Up
    </button>
    <button className="LeaveGame" onClick={gotoMenu}>
      Leave Game
    </button>
  </div>
);

LobbyMenu.propTypes = {
  readyUp: PT.func.isRequired,
  gotoMenu: PT.func.isRequired,
  isReady: PT.bool.isRequired
};

let mapState = state => {
  let myID = state.game.playerID;
  let me = state.game.gameData[myID];
  console.log(myID, me);
  if (me) return { isReady: me.readyUp };
  else return { isReady: false };
};

export default connect(
  mapState,
  { readyUp, gotoMenu }
)(LobbyMenu);
