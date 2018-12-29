import io from "socket.io-client";

console.log("STARTING SOCKET");
let socket = io("http://192.168.1.9:2002/");

let handler = (dispatch, type) => {
	return (data) => {
		dispatch({
			type,
			data
		});
	};
};

export let subscribe = () => {
	return dispatch => {
		console.log("Subscribing");
		socket.on("updateGameData", handler(dispatch, "updateGameData"));
		socket.on("updateBrowserData", handler(dispatch, "updateBrowserData"));
		socket.on("Error", handler(dispatch, "ServerError"));
		socket.on("newMessage", handler(dispatch, "newMessage"));
	};
};

export let unsubscribe = () => {
	socket.removeListener("updateGameData");
	socket.removeListener("updateBrowserData");
};

export let populateBrowser = (filters) => {
	console.log("Gimme some browser data");
	socket.emit("getBrowser", filters);
};

import { loadingGame } from "./popups";
export let createGame = () => {
	return (dispatch, getState) => {
		let state = getState();
		let { creator } = state;

		socket.emit("createGame", creator);
		dispatch(loadingGame());
	};
};

export let joinGame = (gameID) => {
	return dispatch => {
		socket.emit("joinGame", gameID);
		dispatch(loadingGame());
	};
};

export let leaveGame = () => {
	socket.emit("leaveGame", null);
};

export let playerUpdate = (data) => {
	socket.emit("playerUpdate", data);
};

export let updateProfile = ({ name, icon }) => {
	socket.emit("profileUpdate", {
		name,
		icon
	});
};

export let sendMessage = (message) => {
	socket.emit("sendMessage", message);
};