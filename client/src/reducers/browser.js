let initialState = {
	games: [],
};

export default (state = initialState, action) => {
	switch(action.type) {
		case "updateBrowserData":
			return {
				...state,
				games: action.data
			};
		default:
			return state;
	}
}