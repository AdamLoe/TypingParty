import React from "react";
import PropTypes from "prop-types";

let BrowserItem = ({
	joinGame,
	id, name, status,
   	maxPlayers, playerCount,
	maxGames, currGame,
   	scoringType, handicaps
}) => (
	<div className="BrowserItem">
		<div className="BrowserColumn">
			{name}
		</div>
		<div className="BrowserColumn">
			{status}
		</div>
		<div className="BrowserColumn">
			{playerCount + "/" + maxPlayers}
		</div>
		<div className="BrowserColumn">
			{currGame + "/" + maxGames}
		</div>
		<div className="BrowserColumn">
			{scoringType}
		</div>
		<div className="BrowserColumn">
			{handicaps}
		</div>
		<button onClick={() => joinGame(id)}>
			Join
		</button>
	</div>
);

BrowserItem.propTypes = {
	joinGame: PropTypes.function,
	id: PropTypes.string,
	name: PropTypes.string,
	status: PropTypes.string,
	maxPlayers: PropTypes.number,
	playerCount: PropTypes.number,
	maxGames: PropTypes.number,
	currGame: PropTypes.number,
	scoringType: PropTypes.string,
	handicaps: PropTypes.string
};

export default BrowserItem;