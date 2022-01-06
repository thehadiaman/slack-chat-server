const { ObjectId } = require("mongodb");

module.exports = function(data) {
    return {
        product_id: data.product_id,
        purchase_id: ObjectId(),
        customer_support: []
    };
};