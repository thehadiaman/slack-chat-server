const Joi = require('joi');
Joi.ObjectId = require('joi-objectid')(Joi);

const schemas = {
    questionSchema: {
        purchase_id: Joi.ObjectId().required(),
        question: Joi.string().min(1).max(12000).required()
    }
};

exports.validateCustomerSupport = function(schema, data){
    return Joi.object(schemas[schema]).validate(data);
};