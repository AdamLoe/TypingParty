let createNewPlayer = require("./createNewPlayer");

var updates = 0;

module.exports = function(data, players, id) {
	updates += 1;

	if (players[id] === undefined) {
		createNewPlayer(id, players);
	}
	var player = players[id] || {};

	if (data.left) {
		player.x -= 5;
	}
	if (data.up) {
		player.y -= 5;
	}
	if (data.right) {
		player.x += 5;
	}
	if (data.down) {
		player.y += 5;
	}
};

setInterval(function() {
	updates = 0;
}, 1000);

setInterval(function() {
	//console.log("Updates per second:", updates);
	updates = 0;

}, 5000);