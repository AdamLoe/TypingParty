import React from "react";
import PT from "prop-types";

import Icon from "../../components/Profile/Icon";

let Racer = ({ progress, wpm, greyed, name, icon }) => (
  <div className="RacerContainer">
    <div className="Name">{name}</div>
    <div className="Lane">
      <div style={{ left: progress + "%" }} className="Racer">
        <Icon {...icon} greyed={greyed} />
      </div>
    </div>
    <div className="Wpm">{wpm + " WPM"}</div>
  </div>
);
Racer.propTypes = {
  progress: PT.number.isRequired,
  wpm: PT.number.isRequired,
  greyed: PT.bool.isRequired,
  name: PT.string.isRequired,
  icon: PT.shape({
    type: PT.string.isRequired,
    primary: PT.string.isRequired,
    secondary: PT.string.isRequired
  }).isRequired
};

export default Racer;
