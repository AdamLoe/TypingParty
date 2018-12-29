let initialState = {
	status: "",
	string: "",

	scoringType: "",
	handicaps: "",

	playerCount: 0,
	maxPlayers: 0,

	players: {},
	messages: [],
	leaderboard: [],


	raceOver: false,
	finished: false,
};

export default (state = initialState, action) => {
	let { type, data } = action;

	switch(type) {
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