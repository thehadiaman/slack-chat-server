module.exports = function(data) {
    return {
        purchase_id: data.purchase_id,
        question: data.question,
        ts: data.ts,
        user: data.user
    };
};