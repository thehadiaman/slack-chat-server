const {MongoClient} = require('mongodb');


let database;

exports.connect = async()=>{
    const uri = 'mongodb://localhost:27017';
    const client = new MongoClient(uri);

    await client.connect()
    .then((db)=>{
        database = db.db;
        console.log('MongoDB connection successful.');
    })
    .catch((error)=>{
        console.log(error);
        console.log('MongoDB connection failed.');
    });
};

exports.database = ()=>{
    return database;
};