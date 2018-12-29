import { getRandomIcon } from "../components/Other/Icon";

let initState = {
	shouldShowProfile: false,
	name: "DefaultName",
	icon: getRandomIcon()
};
let exampleIcon = {
	type: "icon3",
	primary: "red",
	secondary: "green"
};


export default (state = initState, action) => {
	let { type, name, icon } = action;
	switch(type) {
		case "hideProfile":
			return {
				...state,
				shouldShowProfile: false
			};
		case "showProfile":
			return {
				...state,
				shouldShowProfile: true
			};
		case "updateProfile":
			return {
				...state,
				shouldShowProfile: false,
				name,
				icon
			};
		default:
			return state;
	}
};