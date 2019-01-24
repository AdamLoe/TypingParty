import React from "react";
import { connect } from "react-redux";

import Browser from "./Browser";
import Creator from "./Creator";
import PT from "prop-types";

let Menu = ({ showBrowser, showCreator }) => (
  <div className="Menu">
    {showBrowser && <Browser />}
    {showCreator && <Creator />}
  </div>
);
Menu.propTypes = {
  showBrowser: PT.bool.isRequired,
  showCreator: PT.bool.isRequired
};

let mapState = state => {
  let { showBrowser, showCreator } = state.navigation;
  return {
    showBrowser,
    showCreator
  };
};

export default connect(mapState)(Menu);
