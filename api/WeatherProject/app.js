const express = require("express");
const https = require("https");

const app =express();

app.get("/",function(req,res){
const  url = "https://api.openweathermap.org/data/2.5/weather?q=Chennai&units=metric&appid=67308674280fbc3b9f2aa299fc0bc8b0";
  https.get(url, function(response){
    console.log(res.statusCode);
    response.on("data", function(data){

      const weatherdata=JSON.parse(data);
      console.log(weatherdata);
      const temp = weatherdata.main.temp;
      const weathDescription = weatherdata.weather[0].description;
        const iconImg = weatherdata.weather[0].icon;
        const imageURL = "http://openweathermap.org/img/wn/"+iconImg+"@2x.png";
      console.log(imageURL);
      res.write("<p>The weather is currently is " + weathDescription+"</p>");
      res.write("<h1>The temperature of Chennai now is "+ temp + ".</h1>");
      res.write("<a href="+imageURL+"><img src="+imageURL+"></a>");
      res.send();
    })
  });

});

app.listen(3000, function(){
  console.log("Server started at 3000");
});
