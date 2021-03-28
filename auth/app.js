require('dotenv').config();
const express = require("express");
const _ = require("lodash");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose =require("mongoose");

//#1 ----3 modules required for passport implementation
const session = require("express-session");
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");

const app=express();
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({urlextended:true}));
app.use(express.static("public"));

//#2 -----set up session to have secrets
app.use(session({
    secret:"Our Little Secret.",
    resave: false,
    saveUninitialized: false
}));

//# -----initialized passport and manage to use session
app.use(passport.initialize());
app.use(passport.session());

mongoose.connect("mongodb://localhost:27017/userDB",{useNewUrlParser:true, useUnifiedTopology:true});
mongoose.set("useCreateIndex",true);
const userSchema = new mongoose.Schema({
    email: String,
    password: String
});



//4----- userschema to use passport as a Plugin
userSchema.plugin(passportLocalMongoose);

const User =mongoose.model("user", userSchema);
//5----passport to craete local strategy to use sessions.
passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


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

app.get("/secrets", function(req, res){
    if(req.isAuthenticated()){
        res.render("secrets");
    } else {
        res.redirect("/login");
    }
});



app.post("/register", function(req,res){
    User.register({username: req.body.username}, req.body.password, function(err, user){
        if(err){
            console.log(err);
            res.redirect("/register");
        } else {
            passport.authenticate("local")(req,res, function(){
                res.redirect("/secrets");
            })
        }
    });
});

app.post("/login", function(req,res){
    const user = new User({
        username : req.body.username,
        password : req.body.password
    });

    req.login(user, function(err){
        if(err){
            console.log(err);
        } else {
            passport.authenticate("local")(req,res, function(){
                res.redirect("/secrets");
            });
        }
    });
});


            
