import React from "react";
import PT from "prop-types";

import IconSelector from "../../components/Other/IconSelector";
import ColorSelector from "../../components/Other/ColorSelector";

class ProfileEditor extends React.Component {
  state = {
    name: this.props.name,
    type: this.props.icon.type,
    primary: this.props.icon.primary,
    secondary: this.props.icon.secondary
  };

  handleFocus = e => {
    e.target.select();
  };

  updateProfile = (key, value) => {
    console.log("UPDATING", key, value);
    this.setState(state => {
      return {
        ...state,
        [key]: value
      };
    });
  };

  submit = () => {
    this.props.submitProfile({
      name: this.state.name,
      type: this.state.type,
      primary: this.state.primary,
      secondary: this.state.secondary
    });
  };

  render() {
    let { hideProfile } = this.props;
    let submit = this.submit;

    let { name, type, primary, secondary } = this.state;

    return (
      <div className="ProfileEditor">
        <img
          alt="X"
          src={require("../../img/outline-clear-24px.svg")}
          onClick={hideProfile}
        />
        <input
          onFocus={this.handleFocus}
          onInput={e => this.updateProfile("name", e.target.value)}
          onSubmit={submit}
          defaultValue={name}
          autoFocus={"on"}
        />
        <IconSelector
          update={value => this.updateProfile("type", value)}
          type={type}
          primary={primary}
          secondary={secondary}
        />
        <ColorSelector
          update={value => this.updateProfile("primary", value)}
          color={primary}
        />
        <ColorSelector
          update={value => this.updateProfile("secondary", value)}
          color={secondary}
        />
        <button onClick={submit}>Submit</button>
      </div>
    );
  }
}

ProfileEditor.propTypes = {
  hideProfile: PT.func.isRequired,
  submitProfile: PT.func.isRequired,
  name: PT.string.isRequired,
  icon: PT.objectOf(PT.string).isRequired
};

export default ProfileEditor;
