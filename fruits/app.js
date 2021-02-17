const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/fruitsDB",{useNewUrlParser: true, useUnifiedTopology: true});

const fruitSchema = new mongoose.Schema({
  name: {type:String,
  required:true},
  rating: {
  type: Number,
  min:0,
  max:10
},
  review:String
});

const Fruite = mongoose.model("fruit", fruitSchema);

const fruit = new Fruite({
  name:"Apple",
  rating:67,
  review: "expensive"
});
//fruit.save(); //saves single entry to the database.collectionmongo

const grapes = new Fruite({
  name:"grapes",
  rating:2,
  review: "good"
});

// grapes.save();

// Fruite.deleteMany({name:"grapes"}, function(err){
//   if (err){
//     console.log(err);
//   } else{
//     console.log("all selected docs deleted.");
//   }
// })

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

const peaches = new Fruite({
  name: "Peaches",
  rating:9
})

// peaches.save();


const personSchema = new mongoose.Schema({
  name:String,
  age:Number,
  favfruit:fruitSchema
})

const pineapple = new Fruite({
  name:"pineapple",
  rating:8,
  review:"juicy"
})
pineapple.save();

const mango = new Fruite(
  {
    name:"Mango",
    rating:8.5,
    review:"Sweetier"
  }
);
mango.save();


const Person = mongoose.model("person", personSchema);

const john = new Person({
  name:"John",
  age: 37,
})
const sujith= new Person({
  name:"sujith",
  age:30
})
// sujith.save(); // save single entry to the database.collection
const samu = new Person({
  name:"samu",
  age: 28,
  favfruit:pineapple
});

samu.save();


Person.updateOne({name:"sujith"},{favfruit:mango}, function(err){
  if (err){
    console.log(err);
  }
  else{
    console.log("updated success.");
  }
});

// Fruite.find(function(err, fruits){
//   if(err){
//     console.log(err);
//   } else{
//     fruits.forEach((fruit)=>{
//       console.log(fruit.review);
//     });
//   }
//   mongoose.connection.close();
// })

/* inserts multiple fruits to the database
Fruite.insertMany([kiwi, orange], function(err){
  if (err){
    console.log(err);
  }
  else{
    console.log("Successfully saved all the fruits in fruitsDB.");
  }
})
*/

/* updates the record
Fruite.updateOne({_id:"602ccda4565d353450b14884"},{review:"Peaches are too yummy"}, function(err){
  if(err){
    console.log(err);
  } else{
    console.log("Successfully updated the Document.");
  }
})
*/

// Fruite.deleteOne({name:"Peaches"}, function(err){
//   if(err){
//     console.log(err);
//   } else{
//     console.log("Documetn deleted successfully.");
//   }
// })

const foodSchema = new mongoose.Schema({
  drink:{
    type:String,
    required:[true, "why no drink?"]
  },
  meal:{
    type:String,
    required:true
  },
  water: String
})
const Food = mongoose.model("food", foodSchema);

const breakfast = new Food({
  drink:"JD",
  meal: "Dosa",
  water: "0.25L"
});

// breakfast.save();
