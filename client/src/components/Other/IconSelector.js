import React from "react";

import Icon, { iconList } from "./Icon";

let IconSelector = ({ update, type, primary, secondary }) => (
	<div className="iconSelector">
		{ iconList.map( iconType => (
			<div
				className={"selectIconBox " + (type===iconType && " selected ") }
				key={iconType}
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

export default IconSelector;