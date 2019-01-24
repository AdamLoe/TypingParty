import React from "react";

import Icon from "./Icon";

let ProfileMini = ({ name, toggleProfile, icon }) => (
  <button className="ProfileMini" onClick={toggleProfile}>
    <div className="ProfileMiniName">{name}</div>
    <Icon {...icon} />
  </button>
);

export default ProfileMini;
