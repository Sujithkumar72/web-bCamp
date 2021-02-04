const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({
  extended: true
}));
app.set("view engine", "ejs");
app.use(express.static("public"));

app.listen(3000, function() {
  console.log("server started at 3000");
});

var newtasks = ["coffee", "cake", "muffins"];
var workitems = [];
var dayFull = "";

app.get("/", function(req, res) {
  var today = new Date();
  var dateSettings = {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  }
  dayFull = today.toLocaleDateString("en-IN", dateSettings);

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
