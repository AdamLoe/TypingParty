import React from "react";
import { create } from "react-test-renderer";
import Radio from "./Radio";

let name = "TestName";
let value = "Default";
let updateValue = val => {
  value = val;
};
let options = [
  ["Default", "10 Per Game"],
  ["Rising", "10 at start. 5 more per game"],
  ["Manual", "Set score each game"]
];

let getComponent = () =>
  create(
    <Radio
      name={name}
      value={value}
      updateValue={updateValue}
      options={options}
    />
  );
let component = getComponent();
let root = component.root;

describe("Radio", () => {
  test("it matches the snapshot", () => {
    expect(component.toJSON()).toMatchSnapshot();
  });

  test("updates right values", () => {
    options.map(([option, desc]) => {
      value = null;
      // Name undefined, so we don't include include root
      root.findByProps({ value: option, name: undefined }).props.onClick();
      expect(value).toBe(option);
    });
  });

  test("shows selected description", () => {});
  test("shows hovered description", () => {});

  test("reverts description after unhover", () => {});
  /*
	test("show descriptions", () => {
		options.map(([option, desc]) => {
			root.findByProps({ })
		});
	});
	*/
});
