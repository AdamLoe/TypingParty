import React from "react";
import PT from "prop-types";

let icons = {
	"icon1": ({ primary, secondary }) => (
		<svg viewBox="0 0 200 200" >
			<rect width="100%" height="100%" fill={secondary} stroke={secondary}/>
			<rect x="0" y="0" width="100" height="100" fill={primary} stroke={primary}/>
			<rect x="101" y="101" width="100" height="100" fill={primary} stroke={primary}/>
		</svg>
	),
	"icon2": ({ primary, secondary }) => (
		<svg viewBox="0 0 200 200" >
			<rect width="100%" height="100%" fill={secondary} stroke={secondary}/>
			<rect x="0" y="0" width="85" height="85" fill={primary} stroke={primary}/>
			<rect x="116" y="116" width="85" height="85" fill={primary} stroke={primary}/>
			<rect x="0" y="116" width="85" height="85" fill={primary} stroke={primary}/>
			<rect x="116" y="0" width="85" height="85" fill={primary} stroke={primary}/>
		</svg>
	),
	"icon3": ({ primary, secondary }) => (
		<svg viewBox="0 0 200 200" >
			<rect width="100%" height="100%" fill={secondary} stroke={secondary}/>
			<circle cx="100" cy="100" r="65" fill={primary} stroke={primary}/>
			<circle cx="100" cy="100" r="25" fill={secondary} stroke={secondary}/>
		</svg>
	),
	"icon4": ({ primary, secondary }) => (
		<svg viewBox="0 0 200 200" >
			<rect width="100%" height="100%" fill={secondary} stroke={secondary}/>
			<rect x="85" y="0" width="30" height="200" fill={primary} stroke={primary} />
			<circle cx="100" cy="200" r="80" fill={primary} stroke={primary}/>
		</svg>
	),
	"icon5": ({ primary, secondary }) => (
		<svg viewBox="0 0 200 200" >
			<rect width="100%" height="100%" fill={secondary} stroke={secondary}/>
			<circle cx="140" cy="140" r="25" fill={primary} stroke={primary}/>
			<circle cx="60" cy="70" r="25" fill={primary} stroke={primary}/>
			<circle cx="140" cy="70" r="25" fill={primary} stroke={primary}/>
			<circle cx="40" cy="192" r="25" fill={primary} stroke={primary}/>
		</svg>
	),
	"icon6": ({ primary, secondary }) => (
		<svg viewBox="0 0 200 200" >
			<rect width="100%" height="100%" fill={secondary} stroke={secondary}/>
			<rect x="31" y="31" width="142" height="142" fill={primary} stroke={primary}/>
		</svg>
	),
	"icon7": ({ primary, secondary }) => (
		<svg viewBox="0 0 200 200" transform="scale(-1, -1)">
			<rect width="100%" height="100%" fill={secondary} stroke={secondary}/>
			<polygon points="100 0, 159 181, 5 69, 195 69, 41 181"
					 fill={primary} stroke={primary} strokeWidth={3}/>
		</svg>
	),
};

export let iconList = Object.keys(icons);
export let colorList = ["white", "lightgrey", "grey", "black", "blue", "purple", "deeppink", "red", "orange", "yellow",  "green"];
let random = (length) => Math.floor( Math.random() * length );
export let getRandomIcon = () => ({
	type: iconList[random(iconList.length)],
	primary: colorList[random(colorList.length)],
	secondary: colorList[random(colorList.length)]
});

let Icon = ({ type, primary, secondary }) => {
	if (!(type in icons)) {
		type = "icon1";
	}
	let Svg = icons[type];

	return (
		<Svg
			primary={primary}
			secondary={secondary}
		/>
	);
};

export default Icon;