import React from "react";
import {create} from "react-test-renderer";
import Radio from "./Radio";

let func = () => null;

describe("Radio", () => {
	test("it matches the snapshot", () => {
		let component = create(<Radio
			name="RadioName"
			value="84"
			updateValue={func}
			options={[
				["Default", "10 Per Game"],
				["Rising", "10 at start. 5 more per game"],
				["Manual", "Set score each game"]
			]}
		/>);
		expect(component.toJSON()).toMatchSnapshot();
	});
});