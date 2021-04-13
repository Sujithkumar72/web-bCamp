const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

app.listen(3000, function(req,res){
    console.log("server started at 3000");
});
app.route("/")
.get(function(req,res){
    res.render("home");
})
.post(function(req,res){
    console.log("post from home route "+req.body.input);
    res.redirect("/")
})
.delete(function(req,res){

});

app.route("/:post")
.get(function(req,res){
    console.log(req.params);
})
.put(function(req,res){ //for update the record completely
    
})
.patch(function(req,res){

})
.delete(function(req,res){

});