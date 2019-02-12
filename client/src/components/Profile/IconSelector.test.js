import React from "react";
import { create } from "react-test-renderer";

import IconSelector from "./IconSelector";
import { iconList } from "./Icon";

let type = "icon5";
let primary = "black";
let secondary = "white";
let update = newType => {
  type = newType;
};
let component = create(
  <IconSelector
    update={update}
    type={type}
    primary={primary}
    secondary={secondary}
  />
);
let root = component.root;

describe("IconSelector", () => {
  test("snapshot", () => {
    expect(component.toJSON()).toMatchSnapshot();
  });

  test("update Working", () => {
    iconList.map(icon => {
      root.findByProps({ id: icon }).props.onClick();
      expect(type).toBe(icon);
    });
  });
});
