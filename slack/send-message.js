const { WebClient } = require("@slack/web-api");
const config = require('config');

const client = new WebClient(config.get('SLACK_AUTH_TOKEN'));

module.exports = async function (id, message) {
    try {
        const result = await client.chat.postMessage({
            token: config.get('SLACK_AUTH_TOKEN'),
            channel: id,
            text: message,
            as_user: true,
            username: 'Customer',
        });
        return result;
    } catch (error) {
        return false;
    }
};