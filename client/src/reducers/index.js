import { combineReducers } from "redux";

import navigation from "./navigation";
import creator from "./creator";
import game from "./game";
import browser from "./browser";
import popups from "./popups";
import profile from "./profile";
import messenger from "./messenger";

export default combineReducers({
	navigation,
	creator,
	game,
	browser,
	popups,
	profile,
	messenger
});