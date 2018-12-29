import React from "react";
import {connect} from "react-redux";

import BrowserItem from "../../components/BrowserItem";

import { joinGame } from "../../actions/api";

let Browser = ({ games, joinGame }) => (
	<div className="Browser">
		Browser
		{ games.map(game => (
			<BrowserItem
				joinGame={joinGame}
				{ ...game }
			/>
		))}
	</div>
);

let mapState = (state) => {
	let { games } = state.browser;
	return {
		games
	};
};

export default connect(mapState, { joinGame })(Browser);