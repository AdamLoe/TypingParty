import React from "react";
import PT from "prop-types";
import { connect } from "react-redux";

import { sendMessage } from "../../actions/api";

let Message = ({ primary, secondary, name, text, time, isOwner = false }) => (
  <div className={"Message" + (isOwner ? " isOwner" : "")}>
    <div className="Time" />
    <span
      className="Name"
      style={{
        color: primary
      }}
    >
      {name + ":"}
    </span>
    <span className="Text">{text}</span>
  </div>
);
Message.propTypes = {
  primary: PT.string.isRequired,
  secondary: PT.string.isRequired,
  name: PT.string.isRequired,
  text: PT.string.isRequired,
  time: PT.string.isRequired,
  isOwner: PT.bool
};

let Messenger = ({ messages, players }) => {
  setTimeout(() => {
    var view = document.getElementsByClassName("MessageView")[0];
    if (view) view.scrollTop = view.scrollHeight;
  }, 10);

  return (
    <div className="Messenger">
      <div className="MessageView">
        {messages.map(({ id, text, time }) => (
          <Message
            key={id + time + text}
            primary={players[id].icon.primary}
            secondary={players[id].icon.secondary}
            name={players[id].name}
            text={text}
            time={time}
          />
        ))}
      </div>
      <div className="MessageCreator">
        <input
          onKeyDown={e => {
            if (e.key === "Enter") {
              sendMessage(e.target.value);
              e.target.value = "";
            }
          }}
        />
      </div>
    </div>
  );
};
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
