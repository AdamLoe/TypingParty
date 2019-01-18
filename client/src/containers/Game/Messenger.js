import React from "react";
import PT from "prop-types";
import { connect } from "react-redux";

import { sendMessage } from "../../actions/api";
import Message from "../../components/Game/Message";

class MessageCreator extends React.Component {
  state = {
    message: ""
  };

  submit = value => {
    sendMessage(value);
    this.setState({
      message: ""
    });
  };

  onSubmit = () => {
    this.submit(this.state.message);
  };

  onInput = value => {
    this.setState({
      message: value
    });
  };

  onKeyPress = (key, value) => {
    if (key === "Enter") {
      this.submit(value);
    }
  };

  render() {
    return (
      <div className="MessageCreator">
        <input
          value={this.state.message}
          onChange={e => this.onInput(e.target.value)}
          onKeyPress={e => this.onKeyPress(e.key, e.target.value)}
        />
        <button onClick={this.onSubmit} />
      </div>
    );
  }
}

let Messenger = ({ messages, players }) => (
  <div className="Messenger">
    <div className="MessageView">
      {messages.map(({ id, text, time }) => (
        <Message
          key={id + time + text}
          name={players[id].name}
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
    PT.shape({
      id: PT.string.isRequired,
      text: PT.string.isRequired,
      time: PT.string.isRequired
    })
  ).isRequired,
  players: PT.objectOf(
    PT.shape({
      name: PT.string.isRequired
    })
  ).isRequired
};

let mapState = state => {
  let { messages, players } = state.game;
  return {
    messages,
    players
  };
};

export default connect(
  mapState,
  {}
)(Messenger);
