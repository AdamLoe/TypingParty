import { getSocket } from "./socket";

let handler = (dispatch, type) => {
	return (data) => {
		dispatch({
			type,
			data
		});
	};
};
let packetHandler = (dispatch) => {
	return (data) => {
		let { packetIndex, packet } = data;
	}
};
export let packetSubscribe = () =>{
	return dispatch => {
		let socket = getSocket();
		socket.on("newPacket", packetHandler(dispatch));
	}
};

export let subscribe = () => {
	return dispatch => {
		console.log("Subscribing");
		let socket = getSocket();

		socket.on("updateGameData", handler(dispatch, "updateGameData"));
		socket.on("Error", handler(dispatch, "ServerError"));
		socket.on("newMessage", handler(dispatch, "newMessage"));
	};
};

export let unsubscribe = () => {
	let socket = getSocket();

	socket.removeListener("updateGameData");
	socket.removeListener("updateBrowserData");
};

export let populateBrowser = (filters) => {
	console.log("Gimme some browser data");
	let socket = getSocket();

	socket.emit("getBrowser", filters);
};

import { loadingGame } from "./popups";
export let createGame = () => {
	return (dispatch, getState) => {
		let socket = getSocket();
		let state = getState();
		let { creator } = state;

		socket.emit("createGame", creator);
		dispatch(loadingGame());
	};
};

export let joinGame = (gameID, password = "") => {
	return dispatch => {
		let socket = getSocket();

		socket.emit("joinGame", {
			gameID,
			password
		});
		dispatch(loadingGame());
	};
};

export let leaveGame = () => {
	let socket = getSocket();
	socket.emit("leaveGame", null);
};

export let playerUpdate = (data) => {
	let socket = getSocket();
	socket.emit("playerUpdate", data);
};

export let updateProfile = ({ name, icon }) => {
	let socket = getSocket();
	socket.emit("profileUpdate", {
		name,
		icon
	});
};

export let sendMessage = (message) => {
	let socket = getSocket();

	socket.emit("sendMessage", message);
};