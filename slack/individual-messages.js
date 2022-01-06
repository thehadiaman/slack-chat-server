const {
    WebClient
} = require("@slack/web-api");
const config = require('config');

const client = new WebClient(config.get('SLACK_AUTH_TOKEN'));

module.exports = async function individualMessage(id, ts) {
    try {
        const message = await client.conversations.history({
            token: config.get('SLACK_AUTH_TOKEN'),
            channel: id,
            latest: ts,
            inclusive: true,
            limit: 1
        });
        console.log(message);
        return message;
    } catch (error) {
        console.error(error);
        return false;
    }
};