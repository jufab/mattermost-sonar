var _ = require('underscore');
var jsonFile = require('jsonfile');
var restify = require('restify');

function TransmitterMattermost(configFile) {
    this._configFile = configFile;
    if(!_.isUndefined(this._configFile)) { 
	    this._configServer = jsonFile.readFileSync(this._configFile);
    }
    this._clientApi="";
    this.loadConfigFile();
}

TransmitterMattermost.prototype.loadConfigFile = function() {
    if(!_.isUndefined(this._configFile) && !_.isEmpty(this._configServer)){    
        this._clientApi = restify.createJsonClient(this._configServer.mattermosts.webhook_url);
    }
};

TransmitterMattermost.prototype.pushToMattermost = function(mattermostMessage) {
    this._clientApi.post("",mattermostMessage);
};

TransmitterMattermost.prototype.getClientApi = function()  {
    return this._clientApi;
};

module.exports = TransmitterMattermost;