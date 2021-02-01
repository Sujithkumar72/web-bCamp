const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.listen(3020, function(){
  console.log("server started at 3020");
});

app.get("/", function(req, res){
  res.sendFile(__dirname+"/index.html");
});

app.post("/", function(req, res){
    var weit = parseFloat(req.body.wt);
    var heit = parseFloat(req.body.ht);

    var bmi = weit/(heit*heit);

    res.send("The calculated BMI is "+ bmi);
});
