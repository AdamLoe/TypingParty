import io from "socket.io-client";

let socket = null;

export let getSocket = () => {
	if (socket === null) {
		console.log("SOCKET NOT STARTED YET");
		console.log("ATTEMPTING TO START");
		return startSocket();
	} else {
		return socket;
	}
};

let startSocket = () => {
	console.log("socket starting");
	socket = io("http://192.168.1.9:2002/");
	if (socket === null) {
		console.log("SOCKET STARTING FAILED");
		return null;
	} else {
		return socket;
	}
};