import React from "react";
import { connect } from "react-redux";

import { gotoBrowser, gotoCreator } from "../../actions";

import MenuHeader from "../../components/MenuHeader";
import Browser from "./Browser";
import Creator from "./Creator";

let Menu = ({ gotoBrowser, gotoCreator, showBrowser, showCreator }) => (
  <>
    <MenuHeader gotoBrowser={gotoBrowser} gotoCreator={gotoCreator} />
    {showBrowser && <Browser />}
    {showCreator && <Creator />}
  </>
);

let mapState = state => {
  let { showBrowser, showCreator } = state.navigation;
  return {
    showBrowser,
    showCreator
  };
};

export default connect(
  mapState,
  { gotoBrowser, gotoCreator }
)(Menu);
