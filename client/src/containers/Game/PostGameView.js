import React from "react";
import {connect} from "react-redux";

let PostGameView = ({}) => (
	<div>
	</div>
);

let mapState = (state) => {
	let {} = state;
	return {};
};

export default connect(mapState, {})(PostGameView);