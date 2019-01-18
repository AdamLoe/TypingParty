/*
	Input Handler
	/////////
	Abstracts away actual changing of value
		Updates redux state, i.e. form data
		Updates local state, for performance
	Formats updateValue to just need any e
	Auto updates on onComponentMount
 */
import React from "react";
import { connect } from "react-redux";
import PT from "prop-types";

import TextInput from "../../components/Menu/TextInput";
import Slider from "../../components/Menu/Slider";
import Radio from "../../components/Menu/Radio";

import { updateCreator } from "../../actions";

export class InputHandler extends React.Component {
  state = {
    value: this.props.defaultValue || ""
  };

  componentDidMount() {
    this.update(this.state.value);
  }

  update = value => {
    let { id } = this.props;
    this.setState({ value });
    this.props.updateCreator(id, value);
  };

  updateValue = e => {
    let value = e;
    if (typeof e === "object") value = e.target.value;
    console.log(value);

    this.update(e);
  };

  render() {
    let value = this.state.value;
    let { type } = this.props;
    console.log("render", type, value);

    let Input;
    if (type === "text") Input = TextInput;
    if (type === "slider") Input = Slider;
    if (type === "radio") Input = Radio;

    return (
      <Input value={value} {...this.props} updateValue={this.updateValue} />
    );
  }
}

InputHandler.propTypes = {
  type: PT.string.isRequired,
  name: PT.string.isRequired,
  id: PT.string.isRequired,
  updateCreator: PT.func.isRequired,
  defaultValue: PT.oneOfType([PT.string, PT.number]).isRequired,
  options: PT.arrayOf(PT.arrayOf(PT.string.isRequired).isRequired),
  required: PT.bool,
  min: PT.number,
  max: PT.number
};

export default connect(
  () => ({}),
  { updateCreator }
)(InputHandler);
