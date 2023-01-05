//jshint esversion:6

const express=require("express");
const bodyParser=require("body-parser");
const { application } = require("express");
const date=require(__dirname+"/date.js");
const app=express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));


let items=["buy","sleep"];
let workItems=[];
const days=["sunday","monday","tuesday","wednesday","thrusday","friday","saturday","sunday"];
app.get("/",function(req,res){
    res.render('list',{listTitle:date.getDay(),newListItems:items});
});
app.post("/",(req,res)=>{
    item=req.body.work;
    if(req.body.list==="work"){
        workItems.push(item);
        res.redirect("/work");
    }
    else{
        items.push(item);
        res.redirect("/");
    }
    res.redirect("/");
});

app.get("/work",(req,res)=>{
    res.render('list',{listTitle:"work List",newListItems:workItems});
});

app.get("/about",(req,res)=>{
    res.render('about');
});

app.listen(3000,function(){
    console.log("server started on port 3000");
});
