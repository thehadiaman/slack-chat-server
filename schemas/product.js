const { ObjectId } = require("mongodb");

module.exports = function(data) {
    return {
        product_id: data.product_id,
        customer_support: []
    };
};