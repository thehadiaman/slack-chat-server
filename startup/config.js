const config = require('config');


module.exports = function() {
    if(config.get('DATABASE_URI')==="") throw new Error('Environment variable DATABASE_URI is not defined');  
    if(config.get('SLACK_AUTH_TOKEN')==="") throw new Error('Environment variable SLACK_AUTH_TOKEN is not defined');  
};