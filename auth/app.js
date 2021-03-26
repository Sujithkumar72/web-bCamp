const express = require("express");
const _ = require("lodash");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose =require("mongoose");

const app=express();
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({urlextended:true}));
app.use(express.static("public"));

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
