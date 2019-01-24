import { leaveGame, populateBrowser, updateProfile, playerUpdate } from "./api";

export let gotoMenu = () => {
  leaveGame();
  return {
    type: "gotoMenu"
  };
};

export let gotoBrowser = () => {
  return dispatch => {
    let filters = {};
    populateBrowser(filters);
    dispatch({
      type: "gotoBrowser"
    });
  };
};

export let gotoCreator = () => {
  return {
    type: "gotoCreator"
  };
};

export let updateCreator = (name, value) => {
  return {
    type: "updateCreator",
    name,
    value
  };
};

export let toggleProfile = () => {
  return {
    type: "toggleProfile"
  };
};

export let submitProfile = ({ name, type, primary, secondary }) => {
  let icon = { type, primary, secondary };
  updateProfile({ name, icon });
  return {
    type: "updateProfile",
    name,
    icon
  };
};

export let readyUp = bool => {
  playerUpdate({
    readyUp: bool
  });
  return {
    type: "readyUp",
    bool
  };
};
