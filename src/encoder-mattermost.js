var _ = require('underscore');
var Encoder = require('../resources/sonar-mattermost-encoder.json');
var fs = require("fs");


function EncoderMattermost(sonarUrl) {
    this._sonarUrl = sonarUrl;
}



EncoderMattermost.prototype.encodeSonarMessage = (messageSonar) => {
    if(_.isUndefined(messageSonar) || _.isEmpty(messageSonar)){
        return null;
    } else {        
        var message="{\"username\": \"Sonar\",\"icon_url\": \"https://docs.sonarqube.org/download/attachments/360449/global.logo\",\"attachments\": [{";
        var statusQuality=Encoder.blank;
        if(messageSonar.qualityGate.status==Encoder.OK.text) {
            statusQuality = Encoder.OK;
        } else if (messageSonar.qualityGate.status==Encoder.KO.text) {
            statusQuality = Encoder.KO;
        } else {
            statusQuality = Encoder.KO;
        } 
        message += "\"color\": \""+statusQuality.color+"\",";  
        message += "\"text\": \"|  Project  | Quality Gate  |  Status  |\\n";
        message += "|:-------------|:--------------|:--------------------|\\n ";
        message += "| " + messageSonar.project.name + " | " + messageSonar.qualityGate.name +" | " +statusQuality.icon+ " | \",";
        message += "\"title\": \""+ messageSonar.project.name +"\",";
        message += "\"title_link\": \""+ this._sonarUrl+"/dashboard?id="+encodeURI(messageSonar.project.name)+"\"},";
        // Next Version
        /*
        for(var i in messageSonar.qualityGate.conditions) {
            var condition = messageSonar.qualityGate.conditions[i];
            var operator;
            var status;
            var type;
            var testContent = () => {
                if(condition.status==Encoder.OK.text) {
                    status = Encoder.OK;
                } else if (condition.status==Encoder.KO.text) {
                    status = Encoder.KO;    
                }            
                if(condition.operator==Encoder.GREATER_THAN.text) {
                    operator=Encoder.GREATER_THAN;
                }
                else if (condition.operator==Encoder.LESS_THAN.text) {
                    operator=Encoder.LESS_THAN;
                }
            };        
            if(condition.metric==Encoder.security.metric) {
                type = Encoder.security;
                testContent();
                message += "{\"color\": \""+status.color+"\","+
                "\"text\": \"**"+type.title+"** : "+status.icon+" "+condition.value+" "+operator.icon+" \"},"; 
            } else if (condition.metric==Encoder.reability.metric) {
                type = Encoder.reability;
                testContent();
                message += "{\"color\": \""+status.color+"\","+
                "\"text\": \"**"+type.title+"** : "+status.icon+" "+condition.value+" "+operator.icon+" \"},";
            } else if (condition.metric==Encoder.maintainability.metric) {
                type = Encoder.maintainability;
                testContent();
                message += "{\"color\": \""+status.color+"\","+
                "\"text\": \"**"+type.title+"** : "+status.icon+" "+condition.value+" "+operator.icon+" \"},";
            } else if (condition.metric==Encoder.coverage.metric) {
                type = Encoder.coverage;
                testContent();
                var errorThreshold=condition.errorThreshold;
                message += "{\"text\": \"**"+type.title+"** : "+errorThreshold+" % "+operator.icon+" \"},"; 
            }
            
        }*/
        message += "{\"image_url\": \"https://raw.githubusercontent.com/docker-library/docs/84479f149eb7d748d5dc057665eb96f923e60dc1/sonarqube/logo.png\"}]}";
        return JSON.parse(message);
    }
};

module.exports = EncoderMattermost;