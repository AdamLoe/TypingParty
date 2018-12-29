import React from "react";
import {connect} from "react-redux";

import ProfileMini from "../../components/Other/ProfileMini";
import ProfileEditor from "../../components/Other/ProfileEditor";

import { showProfile, hideProfile, submitProfile } from "../../actions";

let UserProfile = ({
	shouldShowProfile, name, icon,
	showProfile, hideProfile, submitProfile
}) => (
	<div className="UserProfile">
		{ shouldShowProfile ?
			<ProfileEditor
				hideProfile={hideProfile}
				submitProfile={submitProfile}
				name={name}
				icon={icon}
			/>
			:
			<ProfileMini
				showProfile={showProfile}
				name={name}
				icon={icon}
			/>
		}
	</div>
);

let mapState = (state) => {
	let { shouldShowProfile, name, icon } = state.profile;
	return {
		shouldShowProfile,
		name,
		icon
	};
};

export default connect(mapState, { showProfile, hideProfile, submitProfile })(UserProfile);