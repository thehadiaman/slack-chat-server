const messages = require('../routes/messages');


module.exports = (app)=>{
    app.use('/api/messages', messages);
};