"use strict";

var chai = require("chai");
var expect = chai.expect;
var sonarExemple = require("./../resources/sonar.exemple.json");
var EncoderMattermost = require("./../../src/encoder-mattermost");


describe("EncoderMattermost", () => {
    it('encodeSonarMessage() should return null if there\'s no message',()=> {
        var encoderMattermost = new EncoderMattermost();
        expect(encoderMattermost.encodeSonarMessage("")).to.be.null;
    });
    it("encodeSonarMessage() should return an object with sonar.exemple.json",()=> {
        var encoderMattermost = new EncoderMattermost();
        var contenu = encoderMattermost.encodeSonarMessage(sonarExemple);
        expect(contenu).to.be.not.null;
    });
});