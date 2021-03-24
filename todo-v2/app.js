//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js");
const mongoose= require("mongoose");
const url =require("./key");

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

//mongodb connection using mongoose
mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true });

//mongodb Schema
const itemsSchema = { 
  name : String
};

//mongoose model to create collection
const Item = mongoose.model('Item',itemsSchema);

//mongodb document using Model in the Collection
const item1 = new Item({
  name: "Welcome to your Todo"
});
const item2 = new Item({
  name:"Hit the + to add new item"
});
const item3 = new Item({
  name:"click <-- to delete the item"
});
const defaultItems =[item1, item2, item3]; //array of document objects



app.get("/", function(req, res) {

  Item.find({}, function(err, foundItems){ //finding querying all documents
    if(foundItems.length === 0 ){
      //Inserting documents if there is no default items
      Item.insertMany(defaultItems, function(err){
        if(err){
          console.log(err);
        } else{
          console.log("Default items added to the DB");
        }
      });
      res.redirect("/");
    } else {
      res.render("list", {listTitle: "Today", newListItems: foundItems});
    }
  });
});

app.post("/", function(req, res){
  const itemName = req.body.newItem;
//adding new item from the browser as document
  const newItem = new Item({
    name: itemName,
  });

  newItem.save(); //saving the document to the mongodb 

  res.redirect("/");
});

app.get("/work", function(req,res){
  res.render("list", {listTitle: "Work List", newListItems: workItems});
});

app.get("/about", function(req, res){
  res.render("about");
});

app.listen(3000, function() {
  console.log("Server started on port 3000");
});
