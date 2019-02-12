let initialState = {
  info: {},
  players: {},
  gameData: {},
  messages: [],

  lastMajorVersion: 0,
  missingPackets: []
};

import { getPacket } from "../actions/api";

let getMissingPackets = (lastMajorVersion, majorVersion) => {
  let missingPackets = [];
  if (majorVersion > lastMajorVersion + 1) {
    for (
      let version = lastMajorVersion + 1;
      version < majorVersion;
      version++
    ) {
      missingPackets += version;
      getPacket({
        majorVersion: version
      });
    }
  }
  return missingPackets;
};

let spreadCombine = (oldObj, newObj) => {
  let combined = {};
  for (let key in newObj) {
    if (newObj.hasOwnProperty(key)) {
      if (typeof newObj[key] === "object") {
        combined[key] = {
          ...oldObj[key],
          ...newObj[key]
        };
      } else {
        combined[key] = newObj[key];
      }
    }
  }
  return combined;
};

//Dont want game to crash
let validateGameData = data => {
  return data;
};

let updateGameData = (state, data) => {
  let { majorVersion, minorVersion, packet } = data;
  let { lastMajorVersion } = state;

  let { info, players, gameData } = validateGameData(packet);
  return {
    ...state,
    info: {
      ...state.info,
      ...info
    },
    players: {
      ...state.players,
      ...spreadCombine(state.players, players)
    },
    gameData: {
      ...state.gameData,
      ...spreadCombine(state.gameData, gameData)
    },
    missingPackets: [
      ...state.missingPackets,
      ...getMissingPackets(lastMajorVersion, majorVersion)
    ],
    lastMajorVersion: majorVersion
  };
};

let updateGameObject = (state, data) => {
  let { majorVersion, game, playerID } = data;
  let { id } = game;
  return {
    ...state,
    ...validateGameData(game),
    playerID,
    lastMajorVersion: majorVersion,
    messages: id === state.id ? state.messages : []
  };
};

export default (state = initialState, action) => {
  let { type, data } = action;

  switch (type) {
    case "updateGameData":
      return updateGameData(state, data);
    case "updateGameObject":
      return updateGameObject(state, data);
    case "updateMissingPacket":
      return {
        ...state
      };
    case "newMessage":
      return {
        ...state,
        messages: state.messages.concat({
          id: data.id,
          text: data.text,
          time: data.time
        })
      };
    default:
      return state;
  }
};
