let state = require("../state");

let getName = () => {
	let names = [
		"adam",
		"katie",
		"bella",
		"steve",
	];
	let index = Math.floor( Math.random() * names.length );
	return names[index];
};

module.exports = (socket) => {
	let player = {
		id: socket.id,
		name: getName(),
		gameID: null,
		icon: {
			type: "icon1",
			primary: "white",
			secondary: "black"
		}
	};
	state.addPlayer(player);
};