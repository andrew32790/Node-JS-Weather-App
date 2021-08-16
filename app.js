const express = require("express");
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const $ = require( "jquery" );
const https = require("https");
const bodyParser = require("body-parser");
const ejs = require("ejs");

const app = express();
app.use(express.static("public"));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended:true}));

//Get file
app.get("/", function(req,res){
  res.render("index");
})
//Get name
app.post("/", function(req,res){
  const query = req.body.cityName;
  const apiKey= "secret.json";
  const units = "metric";
  const url ="https://api.openweathermap.org/data/2.5/weather?q="+ query +"&appid="+apiKey+"&units="+units;

    https.get(url , function(response){
     console.log(response.statusCode);
     if(response.statusCode==404){
      
     }else{
   //Send data back
     response.on("data", function(data){
       const wData =JSON.parse(data);
       const temp = wData.main.temp
       const desc = wData.weather[0].description
       const icon = wData.weather[0].icon
       const imageURL = ""

       res.send("<h1>The temperature in " + query+ " is "+temp+" degrees Celcius.</h1>"+ "<br>" + desc);

     })
   }
   })


})



//Server Check
app.listen(3000, function(){
  console.log("Server running on port 3000.");
})
