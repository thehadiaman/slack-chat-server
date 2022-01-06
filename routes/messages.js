const router = require('express').Router();
const sendMessage = require('../slack/send-message');
const findMessages = require('../slack/find-messages');
const individualMessages = require('../slack/individual-messages');
const getReplayMessage = require('../slack/get-replay-message');
const replayMessage = require('../slack/replay-message');
const config = require('config');


router.post('/send-message', async(req, res)=>{
    const response = await sendMessage(config.get('CHANNEL_ID'), req.body.message);

    if(!response) return res.status(400).send('Invalid parameters.');

    res.send(response);
});

router.get('/find-messages', async(req, res)=>{
    const response = await findMessages("test-channel");

    if(!response) return res.status(400).send('Invalid parameters.');

    res.send(response);
});

router.get('/get-individual-messages', async(req, res)=>{
    const response = await individualMessages("C02SL07S59U", "1641389907.006400");

    if(!response) return res.status(400).send('Invalid parameters.');

    res.send(response);
});


router.post('/replay-messages', async(req, res)=>{
    const response = await replayMessage("C02SL07S59U", "1641389907.006400", "Hey Boy");

    if(!response) return res.status(400).send('Invalid parameters.');

    res.send(response);
});

router.get('/get-replay-messages', async(req, res)=>{
    const response = await getReplayMessage("C02SL07S59U", "1641389907.006400");

    if(!response) return res.status(400).send('Invalid parameters.');

    res.send(response);
});

module.exports = router;