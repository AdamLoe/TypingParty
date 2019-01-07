let state = require("../state");

let Filter = require("bad-words");
let filter = new Filter();

let maxNameLength = 32;

let defaultMaxPlayers = 4;
let playerMax = 16;
let playerMin = 1;

let defaultMaxGames = 5;
let gameMax = 10;
let gameMin = 1;

let defaultScoringType = "Default";
let scoringTypes = ["Default", "Rising", "Manual"];

let defaultHandicaps = "Off";
let handicapTypes = ["Off", "Auto", "Manual", "Both"];


let getRandomName = () => {
	return "Random Name";
};

let isString = name => typeof name === "string";
let notEmpty = name => name.length > 0;
let stringNotTaken = name => !state.isGameNameTaken(name);
let cutString = (name, length) => name.substring(0, length);
let cleanString = name => filter.clean(name);

let sanitizeName = (name) => {
	if (isString(name) && notEmpty(name) && stringNotTaken(name)) {
		return cutString(cleanString(name), maxNameLength);
	} else {
		return getRandomName();
	}
};

let sanitizePassword = (password) => {
	return password;
};

let isNumber = num => typeof num === "number";
let inRange = (num, min, max) => (num >= min) && (num <= max);

let sanitizeMaxPlayers = (maxPlayers) => {
	if (isNumber(maxPlayers) && inRange(maxPlayers, playerMin, playerMax)) {
		return maxPlayers;
	} else {
		return defaultMaxPlayers;
	}
};

let sanitizeMaxGames = (maxGames) => {
	if (isNumber(maxGames) && inRange(maxGames, gameMin, gameMax)) {
		return maxGames;
	} else {
		return defaultMaxGames;
	}
};

let sanitizeScoringType = (scoringType) => {
	if (scoringType in scoringTypes) {
		return scoringType;
	} else {
		return defaultScoringType;
	}
};

let sanitizeHandicaps = (handicaps) => {
	if (handicaps in handicapTypes) {
		return handicaps;
	} else {
		return defaultHandicaps;
	}
};

module.exports = (filters) => {
	let {
		name, password, maxPlayers,
		maxGames, scoringType, handicaps
	} = filters;
	console.log(sanitizeName(name));
	return {
		name: sanitizeName(name),
		password: sanitizePassword(password),
		maxPlayers: sanitizeMaxPlayers(maxPlayers),
		maxGames: sanitizeMaxGames(maxGames),
		scoringType: sanitizeScoringType(scoringType),
		handicaps: sanitizeHandicaps(handicaps),
	};
};
