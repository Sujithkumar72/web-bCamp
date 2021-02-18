//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
mongoose.connect("mongodb://localhost:27017/todo", {useUnifiedTopology: true,useNewUrlParser: true});
const itemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  }
})
const Item = mongoose.model("item", itemSchema);
const cake = new Item({name: "Cake"});
const coffee = new Item({name: "Coffee"});
const juice = new Item({name: "Juice"});
const defaultItems = [cake, coffee, juice];

//get Home Route
app.get("/", function(req, res) {
  Item.find({}, function(err, items) {
    if (items.length === 0) {
      Item.insertMany(defaultItems, function(err) {
          console.log("Items added to the DB.");
      });
      res.redirect("/");
    } else {
      res.render("list", {listTitle: "Today",newListItems: items});
    }
  })
  console.log("Render successful.");
});
//dynamic list itemSchem
const listSchema = new mongoose.Schema({
  name: String,
  items:[itemSchema]
});
const List = mongoose.model("list",listSchema);
//dynamic page routing
app.get("/:customListName", function(req,res){
  const listName = req.params.customListName;

  List.findOne({name:listName}, function(err, foundList){
    if(!err){
      if(!foundList){
        //create a new listTitle
        const newList = new List({
          name:listName,
          items:defaultItems
        });
        newList.save();
        res.redirect("/" + customListName);
      } else{
        //show an existing list
        res.render("list",{listTitle: foundList.name,newListItems: foundList.items})
      }
    }
  });

});
//post Home Route
app.post("/", function(req, res) {
  const itemName = req.body.newItem;
  const newItem = new Item({
    name: itemName
  });
  newItem.save();
  res.redirect("/");
});
//post on Deelet route to delete the selected item using checkbox
app.post("/delete",function(req,res){
  const removeId = req.body.checkbox;
  Item.findByIdAndRemove(removeId, function(err){
    if(err){
      console.log(err);
    } else {
      console.log("Remove executed.");
    }
    res.redirect("/");
  });
});

// app.get("/work", function(req, res) {
//   res.render("list", {
//     listTitle: "Work List",
//     newListItems: workItems
//   });
// });

// app.get("/about", function(req, res) {
//   res.render("about");
// });

app.listen(3000, function() {
  console.log("Server started on port 3000");
});
