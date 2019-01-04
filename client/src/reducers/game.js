let initialState = {
	name: "",
	timeLeft: 0,

	info: {},
	players: {},
	messages: [],
	leaderboard: {},
	order: [],
	gameData: {},

	raceOver: false,
	finished: false,
};

let exampleState = {
	//Updated on new game
	info: {
		status: "",
		string: "",
		scoringType: "",
		handicaps: "",
		maxPlayers: 0 ,
		raceOver: false,
		finished: false,
	},
	//This will be updated whenever a new player leaves / joins
	players: {
		"123": {
			name: "Sally",
			icon: {
				type: "icon1",
				primary: "green",
				secondary: "blue"
			}
		},
	},
	//This will be updated once a game
	leaderboard: {
		"123": 80
	},
	// This will be constantly added to
	messages: [{
		id: "123",
		text: "I hate memes",
		time: "11:23"
	}],
	//Might change thoughout game, or might only change on game start
	order: ["123", "234", "345"],
	//Updated every game ticks
	//This is the object that will be sent every game tick
	gameData: {
		"123": {
			progress: 80.5,
			wpm: 83
		}
	},
};

//Dont want game to crash
let validateGameData = (data) => {
	return data;
};
let validateLeaderboard = (data) => {
	return data;
};
let validatePlayers = (data) => {
	return data;
};

export default (state = initialState, action) => {
	let { type, data } = action;

	switch(type) {
		//Could also optimize this
		case "updateGameInfo":
			return {
				...state,
				status: "",
				string: "",
				scoringType: ""
			};
		case "updateGameData":
			return {
				...state,
				...validateGameData(data)
			};
		//Could also optimize this
		case "updateLeaderboard":
			return {
				...state,
				...validateLeaderboard(data)
			};
		//Could optimize this
		case "updatePlayers":
			return {
				...state,
				...validatePlayers(data)
			};
		case "newMessage":
			return {
				...state,
				messages: state.messages.concat({
					id: data.id,
					text: data.text,
					time: data.time
				})
			};
		default:
			return state;
	}
};