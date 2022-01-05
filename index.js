const app = require('express')();

require('./startup/config')();
require('./startup/database')();
require('./startup/routes')(app);


app.listen(3000, ()=>{
    console.log('Listening on port 3000.');
});