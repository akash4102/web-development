//jshint esversion:6

const express=require("express");
const bodyParser=require("body-parser");
const { application } = require("express");
const mongoose = require("mongoose");
const { closeDelimiter } = require("ejs");
const _ =require("lodash");

const app=express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
mongoose.set('strictQuery',false);
mongoose.connect("mongodb_database_link",{useNewUrlParser: true});

const itemsSchema ={
    name: {
        type: String,
        required: [true, "please add atleast one work"]
    }
}

const Item=mongoose.model('Item',itemsSchema);

const item1= new Item({
    name: "Welcome to your todolist"
});
const item2= new Item({
    name: "Hit the + button to add a new item."
});
const item3= new Item({
    name: "<-- Hit this to delete an item"
});
const defaultItems=[item1,item2,item3];

const listSchema={
    name: String,
    items: [itemsSchema]
};
const List=mongoose.model("List",listSchema);

app.get("/",function(req,res){
    Item.find((err,items)=>{
        if(items.length===0){
            Item.insertMany(defaultItems,(err)=>{
                if(err){
                    console.log(err);
                }
                else{
                    console.log("successfully saved default items to DB");
                }
            });
            res.redirect('/');
        }
        else{
            res.render('list',{listTitle:"Today",newListItems:items});
        }
    });
});
app.post("/",(req,res)=>{
    const itemName=req.body.work;
    const listName=req.body.list
    const item=new Item({
        name: itemName
    });
    if(listName==="Today"){
        item.save();
        res.redirect('/');
    }
    else{
        List.findOne({name:listName},function(err,foundList){
            foundList.items.push(item);
            foundList.save();
            res.redirect("/"+listName);
        });
    }
});

app.post("/delete",(req,res)=>{
    const checkedItemId=req.body.checkbox;
    const listName=req.body.listName;
    if(listName==="Today"){
        Item.findByIdAndRemove(checkedItemId,function(err){
            if(!err){
                console.log("successfully deleted")
                res.redirect("/");
            }
        });
    }
    else{
        List.findOneAndUpdate({name:listName},{$pull:{items:{_id:checkedItemId}}},function(err,foundList){
            if(!err){
                res.redirect("/"+listName);
            }
        });   
    }
});

app.get('/:customListName',(req,res)=>{
    const customListName=_.capitalize(req.params.customListName);
    List.findOne({name:customListName},function(err,foundList){
        if(!err){
            if(!foundList){
                const list=new List({
                    name: customListName,
                    items: defaultItems
                });
                list.save();
                res.redirect("/"+customListName);
            }
            else {
                res.render("list",{listTitle:customListName,newListItems:foundList.items})
            }
        }
    })
});

app.get("/about",(req,res)=>{
    res.render('about');
});

app.listen(3000,function(){
    console.log("server started on port 3000");
});
