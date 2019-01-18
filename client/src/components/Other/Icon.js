import React from "react";
import PT from "prop-types";

let icons = {
  icon1: ({ primary, secondary }) => (
    <>
      <rect
        x="0"
        y="0"
        width="100"
        height="100"
        fill={primary}
        stroke={primary}
      />
      <rect
        x="101"
        y="101"
        width="100"
        height="100"
        fill={primary}
        stroke={primary}
      />
    </>
  ),
  icon2: ({ primary, secondary }) => (
    <>
      <rect
        x="0"
        y="0"
        width="85"
        height="85"
        fill={primary}
        stroke={primary}
      />
      <rect
        x="116"
        y="116"
        width="85"
        height="85"
        fill={primary}
        stroke={primary}
      />
      <rect
        x="0"
        y="116"
        width="85"
        height="85"
        fill={primary}
        stroke={primary}
      />
      <rect
        x="116"
        y="0"
        width="85"
        height="85"
        fill={primary}
        stroke={primary}
      />
    </>
  ),
  icon3: ({ primary, secondary }) => (
    <>
      <circle cx="100" cy="100" r="65" fill={primary} stroke={primary} />
      <circle cx="100" cy="100" r="25" fill={secondary} stroke={secondary} />
    </>
  ),
  icon4: ({ primary, secondary }) => (
    <>
      <rect
        x="85"
        y="0"
        width="30"
        height="200"
        fill={primary}
        stroke={primary}
      />
      <circle cx="100" cy="200" r="80" fill={primary} stroke={primary} />
    </>
  ),
  icon5: ({ primary, secondary }) => (
    <>
      <circle cx="140" cy="140" r="25" fill={primary} stroke={primary} />
      <circle cx="60" cy="70" r="25" fill={primary} stroke={primary} />
      <circle cx="140" cy="70" r="25" fill={primary} stroke={primary} />
      <circle cx="40" cy="192" r="25" fill={primary} stroke={primary} />
    </>
  ),
  icon6: ({ primary, secondary }) => (
    <rect
      x="31"
      y="31"
      width="142"
      height="142"
      fill={primary}
      stroke={primary}
    />
  ),
  icon7: ({ primary, secondary }) => (
    <polygon
      points="100 0, 159 181, 5 69, 195 69, 41 181"
      fill={primary}
      stroke={primary}
      strokeWidth={3}
    />
  )
};

export let iconList = Object.keys(icons);
export let colorList = [
  "white",
  "lightgrey",
  "grey",
  "black",
  "blue",
  "purple",
  "deeppink",
  "red",
  "orange",
  "yellow",
  "green"
];
let random = length => Math.floor(Math.random() * length);
export let getRandomIcon = () => ({
  type: iconList[random(iconList.length)],
  primary: colorList[random(colorList.length)],
  secondary: colorList[random(colorList.length)]
});

let Icon = ({ type, primary, secondary, greyed = false }) => {
  if (!(type in icons)) {
    type = "icon1";
  }

  let IconCore = icons[type];
  let className = greyed ? "greyedIcon" : "";
  return (
    <svg viewBox="-10 -10 220 220" className={className}>
      <circle cx="100" cy="100" r="100" fill={secondary} />
      <IconCore primary={primary} secondary={secondary} />
      <circle
        cx="100"
        cy="100"
        r="110"
        fill="none"
        stroke="black"
        strokeWidth="20"
      />
    </svg>
  );
};
Icon.propTypes = {
  type: PT.string.isRequired,
  primary: PT.string.isRequired,
  secondary: PT.string.isRequired,
  greyed: PT.bool
};

export default Icon;
