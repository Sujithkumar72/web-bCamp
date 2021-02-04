const express = require("express");
const bodyParser = require("body-parser");
const fullDay = require(__dirname+"/date.js");

const app = express();

app.use(bodyParser.urlencoded({
  extended: true
}));
app.set("view engine", "ejs");
app.use(express.static("public"));

app.listen(3000, function() {
  console.log("server started at 3000");
});

const newtasks = ["coffee", "cake", "muffins"];
const workitems = [];
let dayFull="";


app.get("/", function(req, res) {
dayFull = fullDay.getDayOnly();

  res.render("list", {
    listTitle: dayFull,
    tasknew: newtasks
  });
});

app.get("/about", function(req,res){
  res.render("about");
});

app.get("/work", function(req, res) {

  res.render("list", {
    listTitle: "Work List",
    tasknew: workitems
  });
});

app.post("/", function(req, res) {
  let item = req.body.task;
  console.log(req.body);
  if (req.body.submitName === dayFull) {
    newtasks.push(item);
    res.redirect("/");
  } else {
    workitems.push(item);
    res.redirect("/work");
  }

});
