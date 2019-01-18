import React from "react";
import { create } from "react-test-renderer";
import Icon, { iconList, colorList, getRandomIcon } from "./Icon";

let makeRandomIcon = () => create(<Icon {...getRandomIcon()} />);

describe("icon", () => {
  test("lists not empty", () => {
    expect(iconList.length).toBeGreaterThan(0);
    expect(colorList.length).toBeGreaterThan(0);
  });

  test("random icon JSON valid", () => {
    let randomJson = getRandomIcon();

    expect(randomJson).toHaveProperty("type");
    expect(randomJson).toHaveProperty("primary");
    expect(randomJson).toHaveProperty("secondary");
    expect(randomJson).not.toHaveProperty("memes");

    expect(typeof randomJson.type).toEqual("string");
    expect(typeof randomJson.primary).toEqual("string");
    expect(typeof randomJson.secondary).toEqual("string");
    expect(typeof randomJson.secondary).not.toEqual("number");
  });

  test("default snapshot", () => {
    let component = create(
      <Icon type="icon1" primary="white" secondary="black" />
    );
    expect(component.toJSON()).toMatchSnapshot();
  });

  test("random not throwing", () => {
    expect(makeRandomIcon).not.toThrow();
    expect(makeRandomIcon).not.toThrow();
  });

  test("randoms don't match, COULD BE FALSE", () => {
    let icon1 = makeRandomIcon();
    let icon2 = makeRandomIcon();
    expect(icon1.toJSON()).not.toEqual(icon2.toJSON());
  });
});
