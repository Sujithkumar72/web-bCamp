const express= require("express");
const app = express();
const bodyParser = require("body-parser");


app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));

var expenses="";

app.listen(4001, function(){
  console.log("Server started at port 4001.");
});

app.get("/", function(req, res){
  var dateNow = new Date();
  var dateToday="";
  var dtformat = {
    weekday:"long",
    day:"numeric",
    month:"long",
    year:"numeric",
    }
  var today = dateNow.toLocaleDateString("en-US", dtformat);
  res.render("ex1", {thisDay:today, expCat:expenses});
});

app.post("/", function(req, res){
  expenses = req.body.expCat;
  console.log(req.body.expCat);
  //var expenselist= expenses.push(expen);
  res.redirect("/");
});
