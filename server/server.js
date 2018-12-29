// Dependencies
let express = require("express");
let http = require("http");

let app = express();
let server = http.createServer(app);

let port = 2002;
var host = "0.0.0.0";

app.set("port", port, host);
server.listen(port, host, function() {
	console.log("Starting server on port", port);
});

/*
            Socket
 */
let { socketHandler } = require("./socketHandler");
socketHandler(server);