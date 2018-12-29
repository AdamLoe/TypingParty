import React from "react";
import {connect} from "react-redux";
import PT from "prop-types";

import InputHandler from "./InputHandler";
import { createGame } from "../../actions/api";

import getRandomServerName from "../../helpers/getRandomServerName";

let Creator = ({ createGame }) => (
	<div className="Creator">
		<InputHandler
			type="text"
			name="Server_Name"  defaultValue={getRandomServerName()}
			required={true}
		/>
		<InputHandler
			type="text"
			name="Password"
		/>
		<InputHandler
			type="slider"
			name="Max_Players"
			min={1} max={16}  defaultValue={8}
		/>
		<InputHandler
			type="slider"
			name="Max_Games"
			min={1} max={10}  defaultValue={4}
		/>
		<InputHandler
			type="radio"
			name="Scoring_Type"
			options={[
				["Default", "10 Per Game"],
				["Rising", "10 at start. 5 more per game"],
				["Manual", "Set score each game"]
			]}
		/>
		<InputHandler
			type="radio"
			name="Handicaps"
			options={[
				["Off", "No outside help for anyone"],
				["Auto", "Give slower players a boost"],
				["Manual", "Host choose who to give help"],
				["Both", "Slower players and host choice get help"]
			]}
		/>
		<button onClick={createGame}>
			Create Game
		</button>
	</div>
);

Creator.propTypes = {
	createGame: PT.func.isRequired
};


export default connect(() => {}, {createGame})(Creator);