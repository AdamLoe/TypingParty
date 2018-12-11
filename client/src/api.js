import io from "socket.io-client";

let socket = io("http://localhost:2002");

let gotoRace = () => {
	socket.emit("gotoRace", null);
};

let gotoMenu = () => {
	socket.emit("gotoMenu", null);
};

let subscribe = (updateGameData) => {
	socket.on("updateGameData", updateGameData);
};

let playerUpdate = (data) => {
	socket.emit("playerUpdate", data);
};

export default { subscribe, gotoRace, gotoMenu, playerUpdate };