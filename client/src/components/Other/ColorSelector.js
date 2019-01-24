import React from "react";
import PT from "prop-types";

import { colorList } from "./Icon";

let ColorSelector = ({ update, color }) => (
  <div className="colorSelector">
    {colorList.map(currColor => {
      let style = {
        background: currColor
      };
      let className = "selectColorBox";
      if (color === currColor) {
        className += " selected";
      }
      return (
        <div
          key={currColor}
          className={className}
          onClick={() => update(currColor)}
        >
          <div className="Color" style={style} />
        </div>
      );
    })}
  </div>
);
ColorSelector.propTypes = {
  update: PT.func.isRequired,
  color: PT.string.isRequired
};

export default ColorSelector;
