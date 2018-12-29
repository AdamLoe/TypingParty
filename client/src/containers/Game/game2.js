import React from "react";
import { connect } from "react-redux";

import { Header, RaceView, RaceMenu } from "../../components/components";
import Menu from "../Menu/Menu";
import TypingController from "./TypingController";

import api from "../../actions/api";

export default Game2;
class Game2 extends React.Component {
	state = {
		status: "MENU", // MENU, RACE, POSTGAME
		finished: false,
	};

	componentDidMount() {
		api.subscribe(this.updateGameData);
	}

	componentWillUnmount() {
		api.unsubscribe(this.updateGameData);
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
