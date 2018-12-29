import React from "react";
import {connect} from "react-redux";

import Messenger from "./Messenger";
import Leaderboard from "./Leaderboard";

import RaceView from "./RaceView";
//import TypingController from "./TypingController";

import PostGameView from "./PostGameView";
import RaceMenu from "./RaceMenu";

let Game = ({ raceOver }) => (
	<>
		<Leaderboard />
		<div className="GameMain">
			{ raceOver ?
				<>
					<RaceView />
					<h1> Typer </h1>
				</>
				:
				<>
					<PostGameView />
					<RaceMenu />
				</>
			}
		</div>
		<Messenger />
	</>
);


let mapState = (state) => {
	let { raceOver } = state.game;
	return {
		raceOver
	};
};

export default connect(mapState, {})(Game);