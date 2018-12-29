import React from "react";
import { connect } from "react-redux";
import PT from "prop-types";

import TextInput from "../../components/Menu/TextInput";
import Slider from "../../components/Menu/Slider";
import Radio from "../../components/Menu/Radio";

import { updateCreator } from "../../actions";

class InputHandler extends React.Component {
	state = {
		value: this.props.defaultValue || ""
	};

	componentDidMount() {
		let { name } = this.props;
		let value = this.state.value;
		this.props.updateCreator(name, value);
	}

	updateValue = (e) => {
		let { name } = this.props;
		let value = e;
		if (typeof e === "object") value = e.target.value;
		console.log(value);

		this.setState({value});
		this.props.updateCreator(name, value);
	};

	render() {
		let value = this.state.value;
		let { type } = this.props;
		console.log(type);

		let Input;
		if (type === "text")   Input = TextInput;
		if (type === "slider") Input = Slider;
		if (type === "radio")  Input = Radio;

		return (
			<Input
				value={value}
				{ ...this.props}
				updateValue={this.updateValue}
			/>
		);
	}
}

InputHandler.propTypes = {
	type: PT.string.isRequired,
	name: PT.string.isRequired,
	updateCreator: PT.func.isRequired,
	required: PT.bool,

	options: PT.arrayOf(
		PT.arrayOf(
			PT.string.isRequired
		).isRequired
	).isRequired,

	min: PT.number,
	max: PT.number,
	defaultValue: PT.number,
};


export default connect(() => ({}), { updateCreator })(InputHandler);