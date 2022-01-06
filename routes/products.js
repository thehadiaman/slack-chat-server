const router = require('express').Router();
const { ObjectId } = require('mongodb');
const { Product } = require('../database/product');
const productSchema = require('../schemas/product');
const { validateBody } = require('../validation/product');

router.post('/purchase', async(req, res)=>{
    validateBody('purchaseSchema', req.body);

    let product = await Product.getProduct({_id: ObjectId(req.body.product_id)});
    if(!product) return res.status(404).send('Product is not available.');

    product = productSchema(req.body);
    await Product.makePurchase(product);
    res.send(`purchase id: ${product.purchase_id}`);
});

router.get('/check-purchase-id/:purchase_id', async(req, res)=>{
    const purchase = await Product.getPurchaseDetails(ObjectId(req.params.purchase_id));
    if(!purchase) return res.status(404).send("Invalid purchase id.");

    res.send(true);
});


module.exports = router;