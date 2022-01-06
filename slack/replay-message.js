const { WebClient } = require("@slack/web-api");
const config = require('config');

const client = new WebClient(config.get('SLACK_AUTH_TOKEN'));

module.exports = async function (id, ts, message) {
    try {
        const result = await client.chat.postMessage({
            token: config.get('SLACK_AUTH_TOKEN'),
            channel: id,
            thread_ts: ts,
            text: message,
        });
        return result;
    } catch (error) {
        console.log(error);
        return false;
    }
};