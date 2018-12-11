/**
 * Created by Adam on 12/3/2018.
 */

import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";

import reducers from "./reducers";
import loadState from "./helpers/loadState";


let state = loadState() || {};
let middleware = applyMiddleware(
	thunk
);

let store = createStore(
	reducers,
	state,
	middleware
);

export default store;