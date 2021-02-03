const express = require("express");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.urlencoded({extended: true}));


app.set("view engine","ejs");
var studList = ["sujith","sugu","vasant"];


app.listen(4002, function(){
  console.log("Server started at 4002");
});

app.get("/", function(req, res){
  var date = new Date();
  var dtformat = {
    weekday:"long",
    date:"numeric",
    month:"long",
    year:"numeric"
  }
  var daydate = date.toLocaleDateString("en-IN", dtformat);

  res.render("stud",{asondate:daydate,newstud:studList});
});

app.post("/", function(req, res){
  var studname=req.body.newname;
  studList.push(studname);
  res.redirect("/");
});
