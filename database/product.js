const {database} = require('./connection');
const {PURCHASE_COLLECTION, PRODUCT_COLLECTION} = require('./config.json');

exports.Product = {
    getProduct: (filter)=>{
        return database().collection(PRODUCT_COLLECTION).findOne(filter);
    },
    makePurchase: async(purchase)=>{
        await database().collection(PURCHASE_COLLECTION).insertOne(purchase);
        purchase = await database().collection(PURCHASE_COLLECTION).findOne(purchase);
        return purchase._id;
    },
    checkPurchase: async(purchaseId)=>{
        return await database().collection(PURCHASE_COLLECTION).findOne({_id: purchaseId});
    },
    getPurchaseDetails: (purchaseId)=>{

        return database().collection(PURCHASE_COLLECTION).aggregate([
            {
                $match: {
                    _id: purchaseId
                },
            }
        ]).toArray();
    },
};