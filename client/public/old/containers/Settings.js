import React from "react";
import {connect} from "react-redux";


class Settings extends React.Component {
	constructor(props) {
		super(props);
	}

	componentDidMount() {
		subscribeToTimer((err, data) => {
			console.log("Got Data");
		});
	}

	render() {
		return (
			<div>
				Settings
			</div>
		);
	}
}


let mapStateToProps = (state) => {
};

export default connect(mapStateToProps, {})(Settings);
