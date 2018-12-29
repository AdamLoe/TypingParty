import React from "react";
import { connect } from "react-redux";

import Menu from "./Menu/Menu";
import Game from "./Game/Game";
import Popups from "./Other/Popups";
import HeaderMenu from "./Other/HeaderMenu";

import { subscribe } from "../actions/api";

class App extends React.Component {
	componentDidMount() {
		this.props.subscribe();
	}

	render() {
		let { showMenu, showGame } = this.props;
		return (
			<>
				<Popups />
				<HeaderMenu />
				{ showMenu && <Menu /> }
				{ showGame && <Game /> }
			</>
		);
	}
}

let mapState = (state) => {
	let { showMenu, showGame } = state.navigation;
	return {
		showMenu,
		showGame
	};
};

export default connect(mapState, { subscribe })(App);