import React from "react";

export let Header = ({
	gotoMenu
}) => (
	<div className="Header">
		<button onClick={gotoMenu}>
            Menu
		</button>
	</div>
);

export let Menu = ({ gotoRace, gotoCustom }) => {

	return (
		<div className="MainMenu">
			<button onClick={gotoRace}>
				<img src={require("./img/outline-person_outline-24px.svg")} />
			</button>
			<button onClick={gotoCustom}>
				<img src={require("./img/outline-people_outline-24px.svg")} />
			</button>
		</div>
	);
};

export let RaceView = ({
	players, timeLeft, status
}) => (
	<div className="RaceViewContainer">
		<div className="RaceHeader">
			{ timeLeft }
		</div>
		<div className="RaceView">
			{
				players.map( player =>
					<Racer { ...player }/>
				)
			}
		</div>
	</div>
);

let Racer = (props) => {
	let { progress, wpm, name } = props;
	let style = {
		left: progress.toString() * 95/100 + "%"
	};
	return (
		<div className="RacerContainer">
			<div className="RacerName">
				{ name }
			</div>
			<div className="RacerLane">
				<div
					className="Racer"
					style={style}
				>
				</div>
			</div>
			<div className="RacerWPM">
				{ wpm } WPM
			</div>
		</div>
	);
};

export let RaceMenu = ({ gotoMenu, gotoRace }) => (
	<div>
		<button
			onClick={gotoMenu}
		>
            Goto Menu
		</button>
		<button
			onClick={gotoRace}
		>
            Race Again
		</button>
	</div>
);