import React from "react";
import PT from "prop-types";

let RadioItem = ({
	 value, selected,
	 onClick,  mouseEnter, mouseLeave
}) => (
	<button
		value={value}
		onClick={onClick}
		className={"RadioButton " + value + ( selected ? " selected" : "")}
		onMouseEnter={mouseEnter}
		onMouseLeave={mouseLeave}
	>
		{ value }
	</button>
);
RadioItem.propTypes = {
	value: PT.string.isRequired,
	selected: PT.bool.isRequired,
	onClick: PT.func.isRequired,
	mouseEnter: PT.func.isRequired,
	mouseLeave: PT.func.isRequired,
};

class Radio extends React.Component {
	state = {
		hovered: false,
		hoverDescription: ""
	};

	//We wrap mouseEnter with a description prop to not pass desc down
	mouseEnter = (description) =>
		() => this.setState({
			hovered: true,
			hoverDescription: description
		});

	//No need to wrap because we dont need any information
	mouseLeave = () =>
		this.setState({
			hovered: null
		});

	render() {
		let { name, value, updateValue, options } = this.props;
		let { hovered, hoverDescription } = this.state;

		let description = options.map( ([option, description]) => {
			if (option === value) return description;
		});
		if (hovered) description = hoverDescription;

		return (
			<div className="Input InputRadio">
				<div className="InputName">
					{ name }
				</div>
				{ options.map( ([option, description]) => (
					<RadioItem
						key={option} value={option}
						selected={option === value}
						onClick={() => updateValue(option)}
						mouseEnter={this.mouseEnter(description)}
						mouseLeave={this.mouseLeave}
					/>
				))}
				<div className="InputDescription">
					{ description }
				</div>
			</div>
		);
	}

}

Radio.propTypes = {
	name: PT.string.isRequired,
	value: PT.string.isRequired,
	updateValue: PT.func.isRequired,
	options: PT.arrayOf(
		PT.arrayOf(
			PT.string.isRequired
		).isRequired
	).isRequired
};

export default Radio;