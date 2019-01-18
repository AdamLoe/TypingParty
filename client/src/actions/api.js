import { getSocket } from "./socket";

let handler = (dispatch, type) => {
  return data => {
    dispatch({
      type,
      data
    });
  };
};

let methods = [
  "updateGameData",
  "updateMissingPacket",
  "updateGameObject",
  "updateBrowserData",
  "newMessage",
  "serverError"
];

export let subscribe = () => {
  return dispatch => {
    console.log("Subscribing");
    let socket = getSocket();

    methods.map(method => socket.on(method, handler(dispatch, method)));
  };
};

export let unsubscribe = () => {
  let socket = getSocket();

  methods.map(method => socket.removeListener(method));
};

export let populateBrowser = filters => {
  console.log("Gimme some browser data");
  let socket = getSocket();

  socket.emit("getBrowser", filters);
};

import { loadingGame } from "./popups";
export let createGame = () => {
  return (dispatch, getState) => {
    let socket = getSocket();

    let { creator, profile } = getState();
    let { name, icon } = profile;

    socket.emit("createGame", {
      options: creator,
      name,
      icon
    });
    dispatch(loadingGame());
  };
};

export let joinGame = (gameID, password = "") => {
  return (dispatch, getState) => {
    let socket = getSocket();

    let { name, icon } = getState().profile;
    socket.emit("joinGame", {
      gameID,
      password,
      name,
      icon
    });
    dispatch(loadingGame());
  };
};

export let leaveGame = () => {
  let socket = getSocket();
  socket.emit("leaveGame", null);
};

export let playerUpdate = data => {
  let socket = getSocket();
  socket.emit("playerGameUpdate", data);
};

export let updateProfile = ({ name, icon }) => {
  let socket = getSocket();
  socket.emit("profileUpdate", {
    name,
    icon
  });
};

export let sendMessage = message => {
  let socket = getSocket();

  socket.emit("sendMessage", message);
};

export let getPacket = ({ majorVersion, minorVersion = 0 }) => {
  let socket = getSocket();

  socket.emit("getPacket", {
    majorVersion,
    minorVersion
  });
};
