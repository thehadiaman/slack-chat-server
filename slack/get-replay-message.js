const { WebClient } = require("@slack/web-api");
const config = require('config');
const _ = require('lodash');

const client = new WebClient(config.get('SLACK_AUTH_TOKEN'));

module.exports = async function (id, ts) {
    try {
        let result = await client.conversations.replies({
            token: config.get('SLACK_AUTH_TOKEN'),
            channel: id,
            ts: ts,
        });
        result = _.map(result.messages, _.partialRight(_.pick, ['text', 'user']));
        return result;
    } catch (error) {
        return false;
    }
};