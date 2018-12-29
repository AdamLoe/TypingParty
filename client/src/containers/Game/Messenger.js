import React from "react";
import PT from "prop-types";
import {connect} from "react-redux";

import { sendMessage } from "../../actions/api";
import Message from "../../components/Game/Message";

class MessageCreator extends React.Component {
	state = {
		message: ""
	};

	onInput = (value) => {
		console.log("onInput", value);
		this.setState(state => ({
			message: value
		}))
	};

	onKeyPress = (key, value) => {
		console.log("onKeyPress", key);
		if (key === "Enter") {
			sendMessage(value);
			this.setState(state=> ({
				message: ""
			}))
		}
	};

	render() {
		return (
			<div className="MessageCreator">
				<input
					value={this.state.message}
					onInput={(e) => this.onInput(e.target.value)}
					onKeyPress={(e) => this.onKeyPress(e.key, e.target.value)}
				/>
			</div>
		)
	}
}


let Messenger = ({messages, players}) => (
	<div className="Messager">
		Messager
		<div className="MessageView">
			{ messages.map( ({id, text, time}) => (
				<Message
					key={id}
					name={"Memer"}
					text={text}
					time={time}
				/>
			))}
		</div>
		<MessageCreator />
	</div>
);
Messenger.propTypes = {
	messages: PT.arrayOf(
		PT.objectOf({
			id: PT.number.isRequired,
			text: PT.string.isRequired,
			time: PT.string.isRequired
		})
	).isRequired,
	players: PT.objectOf(
		PT.objectOf({
			name: PT.string.isRequired
		})
	).isRequired
};

let mapState = (state) => {
	let { messages, players } = state.game;
	return {
		messages,
		players
	};
};

export default connect(mapState, {  })(Messenger);