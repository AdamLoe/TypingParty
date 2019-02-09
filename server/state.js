let storage = require("node-persist");

let players = {};
let games = {};

let saves = {};
let packets = {};

exports.addGame = game => {
  games[game.id] = game;
  packets[game.id] = {
    pendingPackets: [],
    majorVersion: 0,
    minorVersion: 0,
    shouldNewMajorVersion: false
  };
};
exports.getGame = gameID => {
  if (!exports.gameExists(gameID)) return null;
  return {
    ...games[gameID],
    info: {
      ...games[gameID].info,
      password: "No Hax"
    }
  };
};
exports.removeGameByID = gameID => {
  delete games[gameID];
  delete packets[gameID];
};

exports.editGame = (gameID, data) => {
  makeNewPacket(gameID, data);
};
let makeNewPacket = (gameID, data) => {
  let { pendingPackets } = packets[gameID];
  pendingPackets.push(data);
};
exports.flushPackets = gameID => {
  if (!exports.gameExists(gameID)) return null;

  let packet = exports.combinePackets(gameID);
  if (isEmpty(packet)) return {};

  let { majorVersion, minorVersion } = getNewPacketVersion({ gameID, packet });
  updatePacketInfo({ gameID, majorVersion, minorVersion, packet });
  applyPacket({ gameID, majorVersion, minorVersion, packet });
  return {
    majorVersion,
    minorVersion,
    packet
  };
};
let isEmpty = obj => {
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) return false;
  }
  return true;
};
exports.combinePackets = gameID => {
  let { pendingPackets } = packets[gameID];
  let combined = {};
  pendingPackets.map(packet => {
    combineObjects(combined, packet);
  });
  packets[gameID].pendingPackets = [combined];
  return combined;
};
let combineObjects = (oldObj, newObj) => {
  Object.keys(newObj).map(key => {
    if (
      oldObj[key] &&
      typeof oldObj[key] === "object" &&
      !Array.isArray(oldObj[key])
    ) {
      combineObjects(oldObj[key], newObj[key]);
    } else {
      oldObj[key] = newObj[key];
    }
  });
  return oldObj;
};
let getNewPacketVersion = ({ gameID, packet }) => {
  let majorVersion = packets[gameID].majorVersion;
  let minorVersion = packets[gameID].minorVersion + 1;
  let shouldMajorVersion =
    packets[gameID].shouldNewMajorVersion ||
    packet.info !== undefined ||
    packet.players !== undefined;
  if (shouldMajorVersion) {
    majorVersion += 1;
    minorVersion = 0;
  }
  return {
    majorVersion,
    minorVersion
  };
};
let updatePacketInfo = ({ gameID, majorVersion, minorVersion, packet }) => {
  packets[gameID] = {
    ...packets[gameID],
    pendingPackets: [],
    majorVersion,
    minorVersion,
    shouldNewMajorVersion: false,
    [majorVersion]: {
      ...packets[gameID].majorVersion,
      [minorVersion]: packet
    }
  };
};
let shouldLogPacket = packet => {
  Object.keys(packet).map(key => {
    if (key !== "gameData") return true;
    let gameObj = packet[key];
    for (let gameKey in gameObj) {
      if (gameKey !== "timeLeft") return true;
    }
    return false;
  });
};
let applyPacket = ({ gameID, majorVersion, minorVersion, packet }) => {
  if (shouldLogPacket(packet)) {
    console.log(
      "Applying packet ",
      majorVersion + ":" + minorVersion,
      "to",
      gameID
    );
    console.log("data:", packet);
  }
  //Update game object
  //In DEV mode, we make sure that our game JSON isn't changing between ticks
  checkGameJSON(gameID);
  combineObjects(games[gameID], packet);
  saveGameJSON(gameID);
};
exports.setNextPacketMajor = gameID => {
  packets[gameID].shouldNewMajorVersion = true;
};
exports.getCurrentPacketVersion = gameID => {
  let { majorVersion, minorVersion } = packets[gameID];
  return {
    majorVersion,
    minorVersion
  };
};
exports.getLatestPacket = gameID => {
  let { majorVersion, minorVersion } = packets[gameID];
  return {
    majorVersion,
    minorVersion,
    packet: packets[gameID][majorVersion][minorVersion]
  };
};

exports.doesPasswordMatch = (gameID, password) => {
  return games[gameID].info.password === password;
};
exports.isGameNameTaken = wantedName => {
  let taken = false;
  Object.keys(games).map(gameID => {
    let { name } = games[gameID].info;
    if (name === wantedName) taken = true;
  });
  return taken;
};
exports.gameExists = gameID => {
  return gameID in games;
};
exports.getGameIDs = () => {
  return Object.keys(games);
};

exports.addPlayerToGame = (gameID, player) => {
  exports.editGame(gameID, {
    info: {
      playerCount: games[gameID].info.playerCount + 1
    },
    players: {
      [player.id]: {
        ...player,
        icon: {
          ...player.icon
        }
      }
    },
    gameData: {
      [player.id]: {
        place: false,
        finished: false,
        score: 0,
        currChar: 0,
        readyUp: false,
        isActive: true
      }
    }
  });
};
exports.updatePlayerInfoInGame = ({ gameID, playerID, data }) => {
  exports.editGame(gameID, {
    players: {
      [playerID]: {
        ...data
      }
    }
  });
};
exports.updatePlayerGameData = (gameID, playerID, data) => {
  exports.editGame(gameID, {
    gameData: {
      [playerID]: {
        ...data
      }
    }
  });
};
exports.getGameIDByPlayerID = playerID => {
  return players[playerID].gameID;
};
exports.getGameByPlayerID = playerID => {
  let gameID = exports.getGameIDByPlayerID(playerID);
  return exports.getGame(gameID);
};
exports.loopPlayersInGameData = (gameID, func) => {
  let gameData = games[gameID].gameData;
  for (let playerID in gameData) {
    if (gameData.hasOwnProperty(playerID)) {
      if (
        typeof gameData[playerID] === "object" &&
        !Array.isArray(gameData[playerID])
      ) {
        func(gameData[playerID], playerID);
      }
    }
  }
};
exports.loopUpdatePlayersInGameData = (gameID, func) => {
  let newFunc = (player, playerID) => {
    let updateObj = func(player, playerID);
    exports.updatePlayerGameData(gameID, playerID, updateObj);
  };
  exports.loopPlayersInGameData(gameID, newFunc);
};

exports.addPlayer = player => {
  players[player.id] = {
    ...player,
    lastActive: Date.now(),
    isActive: true
  };
};
exports.getPlayer = playerID => {
  let { name, icon, id, gameID } = players[playerID];
  return {
    name,
    icon,
    id,
    gameID
  };
};
exports.getPlayerActivity = playerID => {
  let { lastActive, isActive } = players[playerID];
  return {
    lastActive,
    isActive
  };
};

exports.editPlayer = (id, player) => {
  players[id] = {
    ...players[id],
    ...player
  };
};
exports.removePlayer = id => {
  delete players[id];
};

exports.resetPlayer = id => {
  exports.editPlayer(id, {
    gameID: null
  });
};
exports.getPlayerIDBySocket = socket => {
  players[socket.id] = {
    ...players[socket.id],
    lastActive: Date.now()
  };
  return socket.id;
};
exports.isActiveSince = (playerID, secondsSince) => {
  let lastActivity = Date.now() - players[playerID].active;
  return lastActivity < secondsSince;
};

/*
	DEV / USELESS STUFF
 */
let stringifyGame = gameID => JSON.stringify(games[gameID]);
let checkGameJSON = gameID => {
  if (process.env.NODE_ENV !== "production" && gameID in saves) {
    if (stringifyGame(gameID) !== saves[gameID]) {
      console.log("SOMETHING CHANGED THE GAME OBJECT");
      console.log("old Object", saves[gameID]);
      console.log("new Object", stringifyGame(gameID));
    }
  }
};
let saveGameJSON = gameID => {
  if (process.env.NODE_ENV !== "production") {
    saves[gameID] = JSON.stringify(games[gameID]);
  }
};
/*
	Loading / Saving is really possible until I finally set playerID not socket.id
	Because until then, we won't be able to tell who goes where anyways
 */
exports.load = async function() {
  await storage.init();
  let state;
  state = await storage
    .getItem("state")
    .then(data => data)
    .catch(err => console.log("err", err));
  return state;
};
exports.save = async function(state) {
  await storage.init();
  await storage.setItem("state", state);
};
exports.test = {
  packets,
  players,
  games,
  makeNewPacket,
  combineObjects,
  applyPacket,
  stringifyGame,
  checkGameJSON,
  saveGameJSON
};
