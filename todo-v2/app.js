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

//Inserting array into collection using Model as Documents
Item.insertMany(defaultItems, function(err){
  if(err){
    console.log(err);
  } else{
    console.log("Default items added to the DB");
  }
});


app.get("/", function(req, res) {
  res.render("list", {listTitle: "Today", newListItems: items});
});

app.post("/", function(req, res){
  const item = req.body.newItem;
  if (req.body.list === "Work") {
    workItems.push(item);
    res.redirect("/work");
  } else {
    items.push(item);
    res.redirect("/");
  }
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
