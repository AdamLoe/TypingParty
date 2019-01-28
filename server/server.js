// Dependencies
let express = require("express");
let http = require("http");
var https = require("https");
var fs = require("fs");

let port = 2002;
var host = "0.0.0.0";

let server;
let app = express();

console.log(process.env.NODE_ENV, process.env.NODE_ENV === "production");

if (process.env.NODE_ENV === "production") {
  var privateKey = fs.readFileSync(
    "/etc/letsencrypt/live/standardrequests.com/privkey.pem",
    "utf8"
  );
  var certificate = fs.readFileSync(
    "/etc/letsencrypt/live/standardrequests.com/cert.pem",
    "utf8"
  );
  var ca = fs.readFileSync(
    "/etc/letsencrypt/live/standardrequests.com/chain.pem",
    "utf8"
  );

  var options = { key: privateKey, cert: certificate, ca: ca };
  server = https.createServer(options, app);
  server.listen(443);
  console.log("Served on HTTPS");
} else {
  server = http.createServer(app);
  server.listen(port, host);
  app.set("port", port, host);
  console.log("Served on port:", port, " hosted on:", host);
}

/*
            Socket
 */
let { socketHandler } = require("./socketHandler");
socketHandler(server);
