import React from "react";
import { connect } from "react-redux";
import PT from "prop-types";

import { gotoBrowser, gotoCreator } from "../../actions";

import { gotoMenu } from "../../actions/index.js";
import UserProfile from "../Other/UserProfile";

import ServerMenu from "../../components/Menu/ServerMenu";
import TitleButton from "../../components/Menu/TitleButton";
import GameDetails from "../Game/GameDetails";

let HeaderMenu = ({
  gotoMenu,
  showMenu,
  showGame,
  gotoBrowser,
  gotoCreator
}) => (
  <nav className="HeaderMenu">
    <TitleButton onClick={gotoMenu} />
    {showMenu && (
      <ServerMenu gotoBrowser={gotoBrowser} gotoCreator={gotoCreator} />
    )}
    {showGame && <GameDetails />}
    <UserProfile />
  </nav>
);
HeaderMenu.propTypes = {
  gotoBrowser: PT.func.isRequired,
  gotoCreator: PT.func.isRequired,
  gotoMenu: PT.func.isRequired,
  showMenu: PT.bool.isRequired,
  showGame: PT.bool.isRequired
};

export default connect(
  () => ({}),
  { gotoMenu, gotoBrowser, gotoCreator }
)(HeaderMenu);
