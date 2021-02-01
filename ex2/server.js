const express= require("express");
const app = express();

app.get("/", function(req, res){
  res.send("<h1>Hello, Sujith</h1>");
});

app.get("/contact",function(req, res){
  res.send("contact me at SSwebzone.");
});

app.get("/about", function(req, res){
  res.send("Sujith learning web design and developement.");
});

app.get("/hobbies",function(req,res){
  res.send("<ul><li>coffee</li><li>coffee</li><li>coffee</li><li>coffee</li></ul");
})
app.listen(8000, function(){
  console.log("Server started at 8000");
});
