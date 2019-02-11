let state = require("../state");

let sanitizeGameOptions = require("./sanitizeGameOptions");
let joinGame = require("./joinGame");

let getRandom = () => Math.floor(Math.random() * 10 ** 10).toString();
let getGameID = () => {
  let gameID = getRandom();
  while (gameID in state.getGameIDs()) {
    gameID = getRandom();
  }
  return gameID;
};

let lobbyTime = 12;

let getGame = (playerID, options) => {
  let {
    name,
    password,
    maxPlayers,
    maxGames,
    scoringType,
    handicaps
  } = sanitizeGameOptions(options);

  return {
    id: getGameID(),

    info: {
      name,
      password,
      host: playerID,
      created: Date.now(),

      scoringType,
      handicaps,

      status: "LOBBY",
      string: "",
      numChars: 0,

      playerCount: 0,
      maxPlayers,

      currGame: 1,
      maxGames,

      hasRaceStarted: false,
      numFinished: 0,
      activePlayers: 0,

      timeStart: Date.now(),
      timeEnd: Date.now() + lobbyTime * 1000
    },

    //Holds id, name, icon, and any future data we want to show
    players: {},

    //This is what we update every tick, progress/WPM of each player
    gameData: {
      timeLeft: lobbyTime
    },

    banList: {}
  };
};
module.exports = (socket, { options, name, icon }) => {
  let playerID = state.getPlayerIDBySocket(socket);
  let game = getGame(playerID, options);
  state.addGame(game);
  joinGame(socket, {
    gameID: game.id,
    password: game.info.password,
    name,
    icon
  });
};
