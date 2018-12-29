import React from "react";

let TextInput = ({ name, value, updateValue }) => {
	return (
		<div className="Input InputText">
			<div className="InputName">
				{ name }
			</div>
			<input
				value={value}
				onChange={updateValue}
			/>
		</div>
	);
};

export default TextInput;