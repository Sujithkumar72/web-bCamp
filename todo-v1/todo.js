const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine","ejs");

app.listen(4000, function(){
  console.log("server started at 4000");
});

app.get("/", function(req, res){
  var today= new Date();
  var dayNo= today.getDay();
  var dayName ="";

  switch (dayNo) {
    case 0:
      dayName ="Sunday";
      break;
    case 1:
      dayName="Monday";
      break;
    case 2:
      dayName="Tuesday";
      break;
    case 3:
      dayName="Wednesday";
      break;
    case 4:
      dayName="Thursday";
      break;
    case 5:
      dayName="Friday";
      break;
    case 6:
      dayName ="Saturday";
      break;
    default:
      console.log("Error occured"+ dayName);
  }
      res.render("list", {kindOfDay:dayName});
});
