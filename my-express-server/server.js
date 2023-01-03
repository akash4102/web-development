// jshint esversion:6
const express = require("express");

const app=express();

app.get("/", function(req , res){
    // console.log(req);
    // response.send("hello");
    res.send("<h1>hello world</h1>");
});

app.get("/contact", function(req,res){
    res.send("contact me at aakashverma4102@gmail.com");
});

app.get("/about",function(req,res){
    res.send("hey i am akash verma a final year cs student");
});

app.get("/hobbies",function(req,res){
    res.send(
        "cofee code and sleep"
    );
});

app.listen(3000, function(){
    console.log("server started on port 3000");
});