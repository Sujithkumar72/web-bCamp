//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js");
const mongoose= require("mongoose");
const url =require("./key");
const _ = require("lodash");

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

//schema for custom Lists
const listSchema = {
  name: String,
  items: [itemsSchema]
}
//model for Custom List
const List = mongoose.model('list', listSchema);


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
  const listName = _.capitalize(req.body.list);
//adding new item from the browser as document
  const newItem = new Item({
    name: itemName,
  });
  if(listName ==="Today"){
    newItem.save(); //saving the document to the mongodb 
    res.redirect("/");
  } else{
    List.findOne({name:listName}, function(err, foundList){
      foundList.items.push(newItem);
      foundList.save();
      res.redirect("/"+listName);
    });
  }
});


//POST routing for selection of checkbox to delete item
app.post("/delete", function(req,res){

  //using the name "checkbox" value of the selection is extracted
  const checkedItem = req.body.checkbox; 
  const listName = _.capitalize(req.body.listName);
  const today =_.capitalize("Today");
  //mongoose remove from db - query to be executed for the selected item value in db
  if(listName === today){
    Item.findByIdAndRemove(checkedItem, function(err){
      if(err){
        console.log(err);
      } else {
        console.log("selected item deleted from db");
      }
    });
    //after removal, routed back to the home route for display current list
    res.redirect("/");
  } else{
    List.findOneAndUpdate({name:listName}, {$pull:{items:{_id:checkedItem}}}, function(err, foundList){
      if(!err){
        res.redirect("/"+listName);
      }
    });
  }
});


//routing custom lists
app.get("/:customListName", function(req,res){
//storing customlistName
  const customListName = _.capitalize(req.params.customListName);

  //checking for the customListName as document in the Collection
  List.findOne({name:customListName}, function(err, foundList){
    if(!err){
      if(!foundList){ //if no document present
        const list = new List({
          name: customListName,
          items: defaultItems
        });
        list.save();  //save the new list as new document
        res.redirect("/"+customListName); //redirected to the customListName GET
      } else {
        //renders the list ejs to display the customList from the collection
        res.render("list", {listTitle: foundList.name, newListItems: foundList.items});
      } 
    }
  });
});


app.listen(3000, function() {
  console.log("Server started on port 3000");
});
