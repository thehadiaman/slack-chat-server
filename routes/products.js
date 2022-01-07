const router = require('express').Router();
const { ObjectId } = require('mongodb');
const { Product } = require('../database/product');
const productSchema = require('../schemas/product');
const { validateBody } = require('../validation/product');

router.post('/purchase', async(req, res)=>{
    const {error} = validateBody('purchaseSchema', req.body);
    if(error) return res.status(400).send(error.details[0].message);

    let product = await Product.getProduct({_id: ObjectId(req.body.product_id)});
    if(!product) return res.status(404).send('Product is not available.');

    product = productSchema(req.body);
    const purchaseId = await Product.makePurchase(product);

    res.send(purchaseId);
});

router.get('/check-purchase-id/:purchase_id', async(req, res)=>{
    const purchase = await Product.getPurchaseDetails(ObjectId(req.params.purchase_id));
    if(!purchase) return res.status(404).send("Invalid purchase id.");

    res.send(true);
});


module.exports = router;