const express = require("express");
const _ = require("lodash");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose =require("mongoose");

const app=express();
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({urlextended:true}));
app.use(express.static("public"));
mongoose.connect("mongodb://localhost:27017/userDB",{useNewUrlParser:true, useUnifiedTopology:true});

app.listen(3000, function(){
    console.log("server started at 3000");
});

app.get("/", function(req,res){
    res.render("home");
});

app.get("/login", function(req,res){
    res.render("login");
});

app.get("/register", function(req,res){
    res.render("register");
});

const userSchema = {
    email: String,
    password: String
};
const User =mongoose.model("user", userSchema);

app.post("/register", function(req,res){
    const newUser = new User({
        email:req.body.username,
        password: req.body.password
    });
    newUser.save(function(err){
        if(err){
            console.log(err);
        } else{
            res.render("secrets");
        }
    });
});

app.post("/login", function(req,res){
    const username = req.body.username;
    const password = req.body.password;
    User.findOne({email:username}, function(err, founduser){
        if(err){
            console.log(err);
        } else{
            if(founduser){
                if(founduser.password === password){
                    res.render("secrets");
                }
            }
        }
    });
});