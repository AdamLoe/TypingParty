import React from "react";
import {connect} from "react-redux";

import { gotoMenu } from "../../actions/index.js";
import UserProfile from "./UserProfile";

let HeaderMenu = ({ gotoMenu }) => (
	<div className="HeaderMenu">
		<div className="HeaderTitle"
			 onClick={gotoMenu}
			 >
			TypingParty
		</div>
		<UserProfile />
	</div>
);

export default connect(() => ({ }), { gotoMenu })(HeaderMenu);