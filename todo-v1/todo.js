const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine","ejs");

app.listen(4000, function(){
  console.log("server started at 4000");
});

var newtasks =[  "Chocolates", "Beer","chips",];
app.get("/", function(req, res){
  var today= new Date();
  var dateSettings = {
    weekday:"long",
    day:"numeric",
    month:"long",
    year:"numeric",
  }
  var dayFull = today.toLocaleDateString("en-IN", dateSettings);

      res.render("list", {kindOfDay:dayFull, tasknew:newtasks});
});

app.post("/", function(req, res){
    var newtask = req.body.task;
    newtasks.push(newtask);
    res.redirect("/");
});
