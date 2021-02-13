const MongoClient = require("mongodb").MongoClient
const assert = require("assert");


// Replace the uri string with your MongoDB deployment's connection string.
const uri =
  "mongodb://localhost:27017";

const dbName = "fruitsDB";

const client = new MongoClient(uri, {
  useUnifiedTopology: true
});

client.connect(function(err) {
  assert.equal(null, err);
  console.log("connected successfully to server");

  const db = client.db(dbName);
  
  findDocuments(db,function(){
      client.close();
  })

})


const insertDocuments = function(db, callback) {
  const collection = db.collection("fruits");
  collection.insertMany([{
      name: "Apple",
      score: 8,
      review: "Great Fruit"
    }, {
      name: "Orange",
      score: 7.5,
      review: "kinda sour"
    }, {
      name: "Banana",
      score: 9,
      review: "bananaaaa"
    }],
    function(err, result) {
      assert.equal(err, null);
      assert.equal(3, result.result.n);
      assert.equal(3, result.ops.length);
    })
}

const findDocuments = function(db, callback){
  const collection = db.collection("fruits");
  collection.find({}).toArray(function(err,fruits){
    assert.equal(err,null);
    console.log("Found the following records");
    console.log(fruits);
    callback(fruits);
  })
}
