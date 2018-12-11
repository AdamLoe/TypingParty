import React from "react";

import { Menu, Header, RaceView, RaceMenu } from "./components";
import TypingController from "./TypingController";

import api from "./api";

class Game extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			status: "MENU", // MENU, RACE, POSTGAME
			finished: false,
		};
		api.subscribe(this.updateGameData);
		console.log("SUBSCRIBED");
	}

	// Open Menu View, Tell Server Left Race
	gotoMenu = () => {
	    console.log("GOTO MENU");
	    this.setState(state => ({
			...state,
			status: "MENU"
		}));
	    api.gotoMenu();
	};

	//Tell Server Join Race
	gotoRace = () => {
		console.log("GOTO RACE");
		api.gotoRace();
		this.setState(state => ({ finished: false }));
	};

	gotoCustom = () => {

	};

	updateGameData = (gameData) => {
		console.log(gameData);
	    this.setState(state => ({
			...state,
			...gameData
		}));
	};

	finishedRace = () => {
		this.setState(state => ({
			finished: true
		}));
	};

	render() {
		let body;
		let { finished, status } = this.state;

		let isMenu = (status === "MENU");
		let isLobby = (status === "LOBBY");
		let isRace = (status === "RACE");
		let isPost = (status === "POSTGAME");

		let showTypingController = (isLobby || (isRace && !finished));
		let raceOver = (isPost || (isRace && finished));

		return (
			<div className="Game">
				{ isMenu ? (
					<Menu
						gotoRace={this.gotoRace}
						gotoMenu={this.gotoMenu}
					/>
				): (
					<RaceView
						{ ...this.state}
					/>
				)}
				{ showTypingController &&
					<TypingController
						{ ...this.state }
						finishedRace={this.finishedRace}
					/>
				}
				{ raceOver &&
					<RaceMenu
						gotoRace={this.gotoRace}
						gotoMenu={this.gotoMenu}
					/>
				}


			</div>
		);
	}
}

export default Game;