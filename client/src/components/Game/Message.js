import React from "react";
import PT from "prop-types";

let Message = ({ name, text, time, isOwner = false }) => (
  <div className={"Message" + (isOwner ? " isOwner" : "")}>
    <div className="Time">[{time}]</div>
    <div className="Name">{name}</div>
    <div className="Text">{text}</div>
  </div>
);
Message.propTypes = {
  name: PT.string.isRequired,
  text: PT.string.isRequired,
  time: PT.string.isRequired,
  isOwner: PT.bool
};

export default Message;
