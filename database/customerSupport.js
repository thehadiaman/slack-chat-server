const {database} = require('./connection');
const {CUSTOMER_SUPPORT_COLLECTION, PURCHASE_COLLECTION} = require('./config.json');
const { ObjectId } = require('mongodb');


exports.CustomerSupport = {
    submitQuestion: async(question)=>{
        await database().collection(CUSTOMER_SUPPORT_COLLECTION).insertOne(question);

        question = await database().collection(CUSTOMER_SUPPORT_COLLECTION).findOne(question);
        
        await database().collection(PURCHASE_COLLECTION).findOneAndUpdate({
            _id: ObjectId(question.purchase_id)
        }, {
            $push: {
                "customer_support": question._id
            }
        });
        return;
    },
    findByThread: async(ts)=>{
        return database().collection(CUSTOMER_SUPPORT_COLLECTION).findOne({ts: ts});
    }
};