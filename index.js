const app = require('express')();
const config = require('config');

require('./startup/config')();
require('./startup/database')();
require('./startup/routes')(app);

const port = config.get('PORT');
app.listen(port, ()=>{
    console.log(`Listening on port ${port}.`);
});