const express=require("express");
const https=require("https");

const app=express();


app.get("/",function(req,res){
    const url="https://api.openweathermap.org/data/2.5/weather?q=delhi&appid=b7a5d4e3ae8d5754060cb45ab173c2eb";
    https.get(url,function(response){
        console.log(response);
    });
    res.send("server is running");
});




app.listen(3000,function(){
    console.log("server is running on port 3000");
})