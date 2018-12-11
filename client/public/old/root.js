import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import Header from "./components/Header";
import Game from "../../src/TypingController";
import Settings from "./containers/Settings";

console.log("Creating Root");

const Root = ({ store }) => (
	<Provider store={store}>
		<Router>
			<div>
				<Header />
				<Route exact path="/" component={Game} />
				<Route path="/settings" component={Settings} />
			</div>
		</Router>
	</Provider>
);

export default Root;