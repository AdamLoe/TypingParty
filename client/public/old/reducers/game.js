let game = (state = {}, action) => {
	switch (action.type) {
		case "NEW RACE":
			return {};
		default:
			return state;
	}
};

export default game;