const config = require('config');


module.exports = function() {
    if(config.get('DATABASE_URI')==="") throw new Error('Environment variable DB_URI is not defined');
    if(config.get('SLACK_AUTH_TOKEN')==="") throw new Error('Environment variable SLACK_AUTH is not defined');
    if(config.get('CHANNEL_ID')==="") throw new Error('Environment variable CH_ID is not defined'); 
    if(config.get('DB_NAME')==="") throw new Error('Environment variable DBN is not defined'); 
};