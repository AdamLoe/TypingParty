import React from "react";
import PT from "prop-types";

let Message = ({ name, text, time }) => (
	<div className="Message">
		{ name }
		{ text }
		{ time }
	</div>
);
Message.propTypes = {
	name: PT.string.isRequired,
	text: PT.string.isRequired,
	time: PT.string.isRequired
};

export default Message;