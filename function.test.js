let functions = require("./function");

test("Adds 2 + 2 equal 4", () => {
	expect(functions.add(2,2)).toBe(4);
});

test("Adds 2 + 2 NOT equal 5", () => {
	expect(functions.add(2, 2)).not.toBe(5);
});

test("Adds 100 + (-1) equal 99 ", () => {
	expect(functions.add(100,-1)).toBe(99);
});

let api = () => {
	return new Promise((accept, reject) => {
		setTimeout(() => {
			accept(null)
		}, 1);
	});
};

test("Testing async shit", async () => {
	expect.assertions(2);
	let data = await api();
	expect(data).toBeNull();
	expect(data).not.toBe(5);
});

test("Reverse abc equal cba", () => {
	expect(functions.rev("abc")).toBe("cba");
});

test("Reverse abc equal abc", () => {
	expect(functions.rev("abc")).not.toBe("abc");
});