let initialState = {
  name: "",
  timeLeft: 0,

  info: {},
  players: {},
  gameData: {},
  messages: [],

  raceOver: false,
  finished: false,

  lastMajorVersion: 0,
  missingPackets: []
};

let exampleState = {
  //Updated on new game
  info: {
    status: "",
    string: "",
    scoringType: "",
    handicaps: "",
    maxPlayers: 0,
    raceOver: false,
    finished: false
  },
  //This will be updated whenever a new player leaves / joins
  players: {
    "123": {
      name: "Sally",
      icon: {
        type: "icon1",
        primary: "green",
        secondary: "blue"
      }
    }
  },

  gameData: {
    timeLeft: 8,
    "123": {
      currWord: 12,
      score: 10,
      finished: false
    }
  },
  // This will be constantly added to
  messages: [
    {
      id: "123",
      text: "I hate memes",
      time: "11:23"
    }
  ]
};

//Dont want game to crash
let validateGameData = data => {
  return data;
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
  return {
    ...state,
    ...validateGameData(game),
    playerID,
    lastMajorVersion: majorVersion
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
