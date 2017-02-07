var sonarExemple = require("./../resources/sonar.exemple.json");
var TestEncoderMattermost = require('./../../src/encoder-mattermost');
var chai = require('chai');
var expect = chai.expect;
chai.should();

describe('EncoderMattermost', function() {
    it('encodeSonarMessage() should return null if there\'s no message',function() {
        var encoderMattermost = new TestEncoderMattermost();
        expect(encoderMattermost.encodeSonarMessage("")).to.be.null;
    });
    it('encodeSonarMessage() should return an object with sonar.exemple.json',function() {
        var encoderMattermost = new TestEncoderMattermost();
        var contenu = encoderMattermost.encodeSonarMessage(sonarExemple);
        expect(contenu).should.be.not.null;
    });
});