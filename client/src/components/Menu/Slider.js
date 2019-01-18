import React from "react";

import Slider from "rc-slider/lib/Slider";
import "rc-slider/assets/index.css";

let SliderComponent = ({
  name,
  value,
  updateValue,
  min,
  max,
  defaultValue
}) => {
  let marks = {};
  for (let i = min; i <= max; i++) {
    marks[i] = i;
  }
  return (
    <div className="Input InputSlider">
      <div className="InputName">{name}</div>
      <Slider
        defaultValue={defaultValue}
        onChange={updateValue}
        min={min}
        max={max}
        dots={true}
        marks={marks}
      />
    </div>
  );
};

export default SliderComponent;
