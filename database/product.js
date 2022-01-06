const {database} = require('./connection');
const {PURCHASE_COLLECTION, PRODUCT_COLLECTION} = require('./config.json');

exports.Product = {
    getProduct: (filter)=>{
        return database().collection(PRODUCT_COLLECTION).findOne(filter);
    },
    makePurchase: (product)=>{
        database().collection(PURCHASE_COLLECTION).insertOne(product);
    },
    getPurchaseDetails: (purchaseId)=>{
        return database().collection(PURCHASE_COLLECTION).aggregate([
            {
                $match: {
                    purchase_id: purchaseId
                },
                $unwind: "$customer_support"
            }
        ]);
    },
};