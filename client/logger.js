import { createLogger } from "redux-logger";

export default createLogger({
	predicate: (getState, action) => {
		switch (action.type) {

			default:
				return true;
		}
	}
});