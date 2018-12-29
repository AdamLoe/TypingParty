let initialState = {
	"Server_Name": "",
	"Password": "",
	"Max_Players": 8,
	"Max_Games": 4,
	"Scoring_Type": "Default",
	"Handicaps": "Auto"
};

export default (state = initialState, action) => {
	let { type, name, value } = action;
	switch(type) {
		case "updateCreator":
			return {
				...state,
				[name]: value
			};
		default:
			return state;
	}
};