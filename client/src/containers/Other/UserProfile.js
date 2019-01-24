import React from "react";
import { connect } from "react-redux";
import PT from "prop-types";

import ProfileMini from "../../components/Other/ProfileMini";
import ProfileEditor from "../../components/Other/ProfileEditor";

import { toggleProfile, submitProfile } from "../../actions";

let UserProfile = ({
  showProfile,
  name,
  icon,
  toggleProfile,
  submitProfile
}) => (
  <div className="UserProfile">
    <ProfileMini toggleProfile={toggleProfile} name={name} icon={icon} />
    {showProfile && (
      <ProfileEditor
        hideProfile={toggleProfile}
        submitProfile={submitProfile}
        name={name}
        icon={icon}
      />
    )}
  </div>
);
UserProfile.propTypes = {
  showProfile: PT.bool.isRequired,
  name: PT.string.isRequired,
  icon: PT.shape({
    type: PT.string.isRequired,
    primary: PT.string.isRequired,
    secondary: PT.string.isRequired
  }).isRequired,
  toggleProfile: PT.func.isRequired,
  submitProfile: PT.func.isRequired
};

let mapState = state => {
  let { name, icon } = state.profile;
  let { showProfile } = state.navigation;
  return {
    showProfile,
    name,
    icon
  };
};

export default connect(
  mapState,
  { toggleProfile, submitProfile }
)(UserProfile);
