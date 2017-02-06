"use strict";

var restify = require("restify");
var configServer = require("./config.json");
var TransmitterMattermost = require("./src/transmitter-mattermost.js");
var EncoderMattermost= require("./src/encoder-mattermost.js");
var transmitterMattermost = new TransmitterMattermost("./config.json");

var encoderMattermost = new EncoderMattermost(configServer.sonar.url);

var myServer = restify.createServer({
  name: "mattermost-sonar"
});

myServer.use(restify.bodyParser());
myServer.post("/mattermost-sonar", function (req, res, next) {
  transmitterMattermost.pushToMattermost(encoderMattermost.encodeSonarMessage(req.body));
  res.send("OK");
  return next();
});

myServer.listen(configServer.server.port);