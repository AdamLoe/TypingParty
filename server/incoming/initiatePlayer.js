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
		currWord: 0,
		progress: 0,
		wpm: 0,
	};
	state.addPlayer(player);
};


