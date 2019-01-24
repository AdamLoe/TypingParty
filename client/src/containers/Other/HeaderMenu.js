import React from "react";
import { connect } from "react-redux";
import PT from "prop-types";

import { gotoBrowser, gotoCreator } from "../../actions";

import { gotoMenu } from "../../actions/index.js";
import UserProfile from "./UserProfile";

import MenuHeader from "../../components/MenuHeader";

let HeaderMenu = ({ gotoMenu, showMenu, gotoBrowser, gotoCreator }) => (
  <nav className="HeaderMenu">
    <button className="HeaderTitle" onClick={gotoMenu}>
      TypingParty
    </button>
    {showMenu && (
      <>
        <MenuHeader gotoBrowser={gotoBrowser} gotoCreator={gotoCreator} />
      </>
    )}
    <UserProfile />
  </nav>
);
HeaderMenu.propTypes = {
  gotoBrowser: PT.func.isRequired,
  gotoCreator: PT.func.isRequired,
  gotoMenu: PT.func.isRequired,
  showMenu: PT.bool.isRequired
};

export default connect(
  () => ({}),
  { gotoMenu, gotoBrowser, gotoCreator }
)(HeaderMenu);
