"use strict";

var chai = require('chai');
var expect = chai.expect;
var assert = chai.assert;
chai.should();
var sinon = require('sinon');
var restify = require('restify');
var TransmitterMattermost = require('./../../src/transmitter-mattermost');
var resultRequest="";
var myServer;

myServer = restify.createServer({
  name: 'fake-mattermost'
});
myServer.use(restify.bodyParser());
myServer.post('/hooks/:key', function (req, res, next) {
  resultRequest = req.params.payload;
  res.send("ok");
  return next();
});
myServer.listen(8065);  


describe('TransmitterMattermost', function() {
  it('getClientApi() should be empty without conf file', function() {
    var transmitterMattermost = new TransmitterMattermost();
    transmitterMattermost.getClientApi().should.be.empty;
  });
  it('getClientApi() should be empty with config-test-vide.json', function() {
    var transmitterMattermost = new TransmitterMattermost("./tests/resources/config-test-vide.json");
    transmitterMattermost.getClientApi().should.be.empty;
  });
  it('getClientApi() should be not empty with config-test.json', function() {
    var transmitterMattermost = new TransmitterMattermost("./tests/resources/config-test.json");
    transmitterMattermost.getClientApi().should.be.not.empty;
  });
  it('pushToMattermost should execute on fake-mattermost', function() {
    var transmitterMattermost = new TransmitterMattermost("./tests/resources/config-test.json");
    var test = transmitterMattermost.pushToMattermost({"payload" : {"message" : "world"}});
    assert(true);
  });
  after(function() {
    myServer.close();
  });
});