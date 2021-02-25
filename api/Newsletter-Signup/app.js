const express = require("express");
const bodyParser= require("body-parser");
const _ = require("lodash");

const app = express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

app.listen(3000, function(){
  console.log("Server started at 3000");
});

app.get("/", function(req,res){
  res.sendFile(__dirname+"/signup.html");
});

app.post("/", function(req,res){
  var firstName = req.body.firstName;
  var lastName = req.body.lastName;
  var email = req.body.email;

  console.log(firstName, lastName, email);
});
