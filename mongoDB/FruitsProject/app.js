// jshint eseversion:6

const MongoClient=require("mongodb").MongoClient;
const assert=require("assert");

const url='mongodb://localhost:27017';

const dbName='fruitsDB';
const client=new MongoClient(url);

client.connect(function(err){
    assert.equal(null,err);
    console.log("connected successfully to server");

    const db=client.db(dbName);
    insertDocuments(db,function(){
        client.close();
    });
});

const insertDocuments=function(db,callback){
    const collection=db.collection('fruits');
    collection.insertMany([
        {
            name:"apple",
            score:8,
            review:"gread fruit"
        },
        {
            name:"orange",
            score:6,
            review:"kinda sour"
        },
        {
            name:"banana",
            score:9,
            review:"great Stuff"
        }
    ],function(err,result){
        assert.equal(err,null);
        assert.equal(3,result.result.n);
        assert.equal(3,result.ops.length);
        console.log("inserted 3 doucments into teh collection");
        callback(result);
    });
};