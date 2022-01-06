const {MongoClient} = require('mongodb');
const config = require('config');

let database;

exports.connect = async()=>{
    const uri = config.get('DATABASE_URI');
    const client = new MongoClient(uri);

    await client.connect()
    .then((db)=>{
        database = db.db(config.get('DB_NAME'));
        console.log('MongoDB connection successful.');
    })
    .catch((error)=>{
        console.log(error);
        console.log('MongoDB connection failed.');
    });
};

exports.database = function(){
    return database;
};