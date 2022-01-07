const { ObjectId } = require('mongodb');
const { CustomerSupport } = require('../database/customerSupport');
const { Product } = require('../database/product');
const questionSchema = require('../schemas/question');
const { validateCustomerSupport } = require('../validation/purchase');
const router = require('express').Router();
const sendMessage = require('../slack/send-message');
const sendMessageToThread = require('../slack/replay-message');
const config = require('config');

router.post('/submit-question', async(req, res)=>{
    const {error} = validateCustomerSupport("questionSchema", req.body);
    if(error) return res.status(400).send(error.details[0].message);

    const purchase = await Product.checkPurchase(ObjectId(req.body.purchase_id));
    if(!purchase) return res.status(404).send("Invalid purchase id.");

    const response = await sendMessage(config.get("CHANNEL_ID"), req.body.question);
    if(!response) return res.status(400).send('Invalid parameters.');
    req.body.ts = response.ts;
    req.body.user = response.message.user;

    const question = questionSchema(req.body);
    await CustomerSupport.submitQuestion(question);

    res.send("question submitted");
});

router.post('/send-message', async(req, res)=>{
    const {error} = validateCustomerSupport("messageSchema", req.body);
    if(error) return res.status(400).send(error.details[0].message);

    const ts = await CustomerSupport.findByThread(req.body.ts);
    if(!ts) return res.status(404).send("Invalid thread.");

    const channelId = config.get('CHANNEL_ID');
    const response = await sendMessageToThread(channelId, req.body.ts, req.body.message);
    if(!response) return res.status(400).send('Invalid parameters.');

    res.send('message send.');
});

module.exports = router;