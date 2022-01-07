const { ObjectId } = require('mongodb');
const { CustomerSupport } = require('../database/customerSupport');
const { Product } = require('../database/product');
const purchaseSchema = require('../schemas/purchase');
const { validateCustomerSupport } = require('../validation/purchase');
const router = require('express').Router();

router.post('/submit-question', async(req, res)=>{
    const {error} = validateCustomerSupport("questionSchema", req.body);
    if(error) return res.status(400).send(error.details[0].message);

    const purchase = await Product.checkPurchase(ObjectId(req.body.purchase_id));
    if(!purchase) return res.status(404).send("Invalid purchase id.");

    const question = purchaseSchema(req.body);
    await CustomerSupport.submitQuestion(question);

    res.send("question submitted");
});

module.exports = router;