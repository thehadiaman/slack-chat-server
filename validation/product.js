const Joi = require('joi');
Joi.ObjectId = require('joi-objectid')(Joi);

const schemas = {
    purchaseSchema: {
        product_id: Joi.ObjectId().required()
    }
};

exports.validateBody = function(schema, data){
    Joi.object(schemas[schema]).validate(data);
};