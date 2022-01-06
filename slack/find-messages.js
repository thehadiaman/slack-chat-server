const {
    WebClient,
} = require("@slack/web-api");
const config = require('config');

const client = new WebClient(config.get('SLACK_AUTH_TOKEN'));

module.exports = async function findConversation(name) {
    try {
        const result = await client.conversations.list({
            token: config.get('SLACK_AUTH_TOKEN')
        });

        for (const channel of result.channels) {
            if (channel.name === name) {
                conversationId = channel.id;
                return conversationId;
            }
        }
    } catch (error) {
        console.error(error);
        return false;
    }
};