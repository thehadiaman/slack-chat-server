const messages = require('../routes/messages');
const express = require('express');


module.exports = (app)=>{
    app.use(express.json());
    app.use('/api/messages', messages);
};