const express = require("express");
const bodyParser = require("body-parser");
const _ = require("lodash");
const ejs = require("ejs");
const MongoClient = require('mongodb').MongoClient;

const app=express();
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

const uri = "mongodb+srv://admin-sujith:Test_123@cluster0.8ffvv.mongodb.net/blog?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  const collection = client.db("blog").collection("devices");
  // perform actions on the collection object
  console.log("Connection successful");
  client.close();
});


const homeStartingContent ="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum";

const aboutStartingContent ="Writers around the world publish millions of articles to the Internet every day. Does yours stand out? If you’re a content creator, making a few simple changes will help you become the kind of writer whose posts are readable, relatable, and shareable. Here are five things that will make you better at content writing and help your posts shine like a beacon in a sea of words.";

const contactStartingContent = "Most contact pages are designed with function in mind.They slap an email address, phone, and location on a plain background and call it a day.But basic contact pages don’t inspire visitors to reach out and connect.Other pages make it easy to contact the company – which is awesome.Except, that can also drive up customer service costs.So what makes the perfect Contact Us page?An awesome Contact Us page finds just the right balance between making it easy to reach the company and sharing resources users can use to answer their questions right away.Keep reading to discover 39 examples of Contact Us pages that go beyond the basics and will, hopefully, inspire you to take your site to the next level.";

app.listen(3000, function(){
    console.log("Server started on Port 3000");
});

let posts =[];

app.get("/", function(req, res){
    res.render("home", {homeContent: homeStartingContent,
    blogs: posts});
    //console.log(posts);
});
app.get("/about", function(req,res){
    res.render("about",{aboutContent:aboutStartingContent});
});
app.get("/contact", function(req,res){
    res.render("contact", {contactContent: contactStartingContent});
});
app.get("/compose", function(req, res){
    res.render("compose");
});
app.post("/compose",function(req,res){
    //console.log(req.body.newContent +" "+ req.body.newTitle);
    // let postTitle = req.body.newTitle;
    // let postBody = req.body.newContent;
    const postContent = {
        postTitle : req.body.newTitle,
        postBody : req.body.newContent
    };
    posts.push(postContent);
    res.redirect("/");
});
app.get("/posts/:postnum", function(req,res){
    var reqPage = _.lowerCase(req.params.postnum);
    var requestedPage;
    for(let i = 0; i<posts.length; i++){
        let checkTitle = _.lowerCase(posts[i].postTitle);
        if(checkTitle === reqPage){
            // requestedPage="Match found";git 
            checkTitle = checkTitle.toUpperCase();
            dynTitle = posts[i].postTitle;
            dynContent =posts[i].postBody;
            res.render("post", {blogTitle: dynTitle, blogContent:dynContent});
            break;
        } else {
            requestedPage="No Match found";
        }
    }
    // console.log(requestedPage);
});