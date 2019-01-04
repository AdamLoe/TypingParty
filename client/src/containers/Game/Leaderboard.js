import React from "react";
import {connect} from "react-redux";
import PT from "prop-types";

import Icon from "../../components/Other/Icon";

let PlayerScore = ({ name, icon, score }) => (
	<div className="PlayerScore">
		{ name }
		<Icon {...icon} />
		{ score }
	</div>
);
PlayerScore.propTypes = {
	name: PT.string.isRequired,
	icon: PT.shape({
		type: PT.string.isRequired,
		primary: PT.string.isRequired,
		secondary: PT.string.isRequired
	}).isRequired,
	score: PT.string.isRequired
};
let sortTopDown = (obj) => Object.keys(obj).sort( (a,b) => obj[b] - obj[a]);

let Leaderboard = ({ leaderboard, players }) => (
	<div className="Leaderboard">
		Leaderboard
		{ sortTopDown(leaderboard).map( (id) =>
			<PlayerScore
				score={leaderboard[id]}
				key={id}
				name={players[id].name}
				icon={players[id].icon}
			/>
		)}
	</div>
);

Leaderboard.propTypes = {
	leaderboard: PT.objectOf(PT.number.isRequired).isRequired,
	players: PT.objectOf(
		PT.shape({
			id: PT.string.isRequired,
			name: PT.string.isRequired,
			icon: PT.object.isRequired,
		})
	)
};

let mapState = (state) => {
	let { leaderboard, players } = state.game;
	return {
		leaderboard,
		players
	};
};

export default connect(mapState, {})(Leaderboard);