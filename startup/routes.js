const express = require('express');
const messages = require('../routes/messages');
const products = require('../routes/products');


module.exports = (app)=>{
    app.use(express.json());
    app.use('/api/messages', messages);
    app.use('/api/products', products);
};