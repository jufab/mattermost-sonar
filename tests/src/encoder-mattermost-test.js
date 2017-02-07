var sonarExemple = require("./../resources/sonar.exemple.json");
var EncoderMattermost = require('./../../src/encoder-mattermost');
var chai = require('chai');
var expect = chai.expect;

describe('EncoderMattermost', function() {
    it('encodeSonarMessage() should return null if there\'s no message',function() {
        var encoderMattermost = new EncoderMattermost();
        expect(encoderMattermost.encodeSonarMessage("")).to.be.null;
    });
    it('encodeSonarMessage() should return an object with sonar.exemple.json',function() {
        var encoderMattermost = new EncoderMattermost();
        var contenu = encoderMattermost.encodeSonarMessage(sonarExemple);
        expect(contenu).not.be.null;
    });
});