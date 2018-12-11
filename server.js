// Dependencies
let express = require("express");
let http = require("http");
let path = require("path");

let app = express();
let server = http.createServer(app);

let port = 2002;
var host = "0.0.0.0";

app.set("port", port, host);
server.listen(port, host, function() {
	console.log("Starting server on port", port);
});

/*
            File Handling
 */
app.use("/", express.static(__dirname + "/client/public/dist/"));

app.get("/", function(request, response) {
	response.sendFile(path.join(__dirname, "/client/public/dist/index.html"));
});

/*
            Socket
 */
let { socketHandler } = require("./server/socketHandler");
socketHandler(server);
