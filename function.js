let functions = {
	add: (n1, n2) => n1 + n2,
	rev: (str) =>
		str
			.split("")
			.reverse()
			.join("")
};

module.exports = functions;