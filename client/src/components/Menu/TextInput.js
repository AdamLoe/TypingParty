import React from "react";
import PT from "prop-types";

let TextInput = ({ name, value, updateValue, maxLength = 16 }) => {
	return (
		<div className="Input InputText">
			<div className="InputName">
				{ name }
			</div>
			<input
				maxLength={maxLength}
				value={value}
				onChange={updateValue}
			/>
		</div>
	);
};

TextInput.propTypes = {
	name: PT.string.isRequired,
	value: PT.string.isRequired,
	updateValue: PT. func.isRequired,
	maxLength: PT.number
};

export default TextInput;