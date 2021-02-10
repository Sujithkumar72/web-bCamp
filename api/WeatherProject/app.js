const express = require("express");
const https = require("https");

const app =express();

app.get("/",function(req,res){
const  url = "https://api.openweathermap.org/data/2.5/weather?q=Chennai&appid=67308674280fbc3b9f2aa299fc0bc8b0";
  https.get(url, function(res){
    console.log(res.statusCode);
  });
  res.send("Server is Up and running");
});

app.listen(3000, function(){
  console.log("Server started at 3000");
});
