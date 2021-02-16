const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/fruitsDB",{useNewUrlParser: true, useUnifiedTopology: true});

const fruitSchema = new mongoose.Schema({
  name: String,
  rating: Number,
  review:String
});

const Fruite = mongoose.model("fruit", fruitSchema);
const fruit = new Fruite({
  name:"Apple",
  rating:7,
  review: "expensive"
})
// fruit.saves //saves single entry to the database.collection

const kiwi = new Fruite({
  name:"kiwi",
  rating: 8,
  review:"Awesome"
})
const orange = new Fruite({
  name: "Orange",
  rating:9,
  review:"citric"
})
/* insert multiple fruits to the database
Fruite.insertMany([kiwi, orange], function(err){
  if (err){
    console.log(err);
  }
  else{
    console.log("Successfully saved all the fruits in fruitsDB.");
  }
})
*/
const personSchema = new mongoose.Schema({
  name:String,
  age:Number
})

const Person = mongoose.model("person", personSchema);

const john = new Person({
  name:"John",
  age: 37
})
const sujith= new Person({
  name:"sujith",
  age:30
})
// sujith.save(); // save single entry to the database.collection







const findDocuments = function(db, callback){
  const collection = db.collection("fruits");
  collection.find({}).toArray(function(err,fruits){
    assert.equal(err,null);
    console.log("Found the following records");
    console.log(fruits);
    callback(fruits);
  })
}
