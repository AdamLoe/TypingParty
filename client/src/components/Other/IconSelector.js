import React from "react";
import PT from "prop-types";

import Icon, { iconList } from "./Icon";

let IconSelector = ({ update, type, primary, secondary }) => (
	<div className="iconSelector">
		{ iconList.map( iconType => (
			<div
				className={"selectIconBox " + (type===iconType && " selected ")}
				key={iconType} id={iconType}
				onClick={() => update(iconType)}
			>
				<Icon
					type={iconType}
					primary={primary}
					secondary={secondary}
				/>
			</div>
		))}
	</div>
);
IconSelector.propTypes = {
	update: PT.func.isRequired,
	type: PT.string.isRequired,
	primary: PT.string.isRequired,
	secondary: PT.string.isRequired
};
export default IconSelector;