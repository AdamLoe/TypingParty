let state = require("../state");
let { emitRoom } = require("../socket");
let checkInValidGame = require("../helpers/checkInValidGame");

let getTime = () => {
  let date = new Date();
  return date.getHours() + ":" + date.getMinutes();
};

module.exports = (socket, message) => {
  if (checkInValidGame(socket)) {
    let playerID = state.getPlayerIDBySocket(socket);
    let gameID = state.getGameIDByPlayerID(playerID);

    console.log("Received Message", message, "from", playerID);

    emitRoom(gameID, "newMessage", {
      id: playerID,
      text: message,
      time: getTime()
    });
  }
};
