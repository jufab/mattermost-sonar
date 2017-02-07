var _ = require('underscore');
var Encoder = require('../resources/sonar-mattermost-encoder.json');


function EncoderMattermost(sonarUrl) {
    this._sonarUrl = sonarUrl;
}


EncoderMattermost.prototype.encodeSonarMessage = (messageSonar) => {
    if(_.isUndefined(messageSonar) || _.isEmpty(messageSonar)){
        return null;
    } else {        
        var message="{\"username\": \"Sonar\",\"icon_url\": \"https://docs.sonarqube.org/download/attachments/360449/global.logo\",\"attachments\": [{";
        var statusQuality=Encoder.KO;
        if(messageSonar.qualityGate.status===Encoder.OK.text) {
            statusQuality = Encoder.OK;
        }
        message += "\"color\": \""+statusQuality.color+"\",";  
        message += "\"text\": \"|  Project  | Quality Gate  |  Status  |\\n";
        message += "|:-------------|:--------------|:--------------------|\\n ";
        message += "| " + messageSonar.project.name + " | " + messageSonar.qualityGate.name +" | " +statusQuality.icon+ " | \",";
        message += "\"title\": \""+ messageSonar.project.name +"\",";
        message += "\"title_link\": \""+ this._sonarUrl+"/dashboard?id="+encodeURI(messageSonar.project.name)+"\"},";
        message += "{\"image_url\": \"https://raw.githubusercontent.com/docker-library/docs/84479f149eb7d748d5dc057665eb96f923e60dc1/sonarqube/logo.png\"}]}";
        return JSON.parse(message);
    }
};

module.exports = EncoderMattermost;