import React from "react";

import Icon from "./Icon";

let ProfileMini = ({ name, showProfile, icon }) => (
	<>
		<div className="ProfileMini"
			 onClick={showProfile}
			 >
			{ name }
			<Icon { ...icon } />
		</div>
	</>
);

export default ProfileMini;