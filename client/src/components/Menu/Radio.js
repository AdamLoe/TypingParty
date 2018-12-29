import React from "react";
import PT from "prop-types";

let Radio = ({
	name, updateValue, options
}) => (
	<div className="Input InputRadio">
		<div className="InputName">
			{ name }
		</div>
		{ options.map( ([value, description]) => (
			<button
				key={value}
				value={value}
				className="RadioButton"
				onClick={() => updateValue(value)}
			>
				{ value }
			</button>
		))}
	</div>
);

Radio.propTypes = {
	name: PT.string.isRequired,
	updateValue: PT.func.isRequired,
	options: PT.arrayOf(
		PT.arrayOf(
			PT.string.isRequired
		).isRequired
	).isRequired
};

export default Radio;