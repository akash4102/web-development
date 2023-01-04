const express=require("express");
const https=require("https");
const bodyParser=require("body-parser");

const app=express();

app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req,res){
    res.sendFile(__dirname+"/index.html");
});

app.post("/",function(req,res){
    const city=req.body.cityName;
    const query=city;
    const apiKey="API_KEY";
    const unit="metric";
    const url="https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+apiKey+"&units="+unit;
    https.get(url,function(response){
        response.on("data",function(data){
            const weatherData=JSON.parse(data);
            const temp=weatherData.main.temp
            const weatherDescription=weatherData.weather[0].description;
            const icon=weatherData.weather[0].icon;
            const imgUrl="https://openweathermap.org/img/wn/"+icon+"@2x.png";
            res.write("<p>the Weather is currently"+weatherDescription +"</p>");
            res.write("<h1>the temperature in " + query +" is "+temp+"desgrees celcius.</h1>")
            res.write('<img src="' + imgUrl + '">');
            res.send();
        });
    });
});







app.listen(3000,function(){
    console.log("server is running on port 3000");
})
