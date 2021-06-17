//jshint esversion: 6

const express= require("express");
const bodyParser= require("body-parser");
const request=require("request");
const https = require('https');


const app=express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));


app.get("/", function(req,res){
  res.sendFile(__dirname+"/signup.html");
});
app.post("/", function(req, res){
const firstName=req.body.fname;
const lastName=req.body.lname;
const email=req.body.email;
// console.log(firstName, LastName, email)

var data={
  members: [
    {
      email_address: email,
      status: "subscribed",
      merge_fields:{
        FNAME:firstName,
        LNAME:lastName
      }
    }
    ]
};
var jsonData= JSON.stringify(data);
const url= "https://us6.api.mailchimp.com/3.0/lists/e7dc1f396e";
const options={
  method: "POST",
  auth: "Falguni85:413c9e819b02a524de7ed7691e81b870-us6"
}
  
const request=https.request(url, options, function(response){

  if (response.statusCode===200){
    
    res.sendFile(__dirname+"/success.html");}
    else{
       res.sendFile(__dirname+"/failure.html");}
 
  
  response.on("data", function(data){
console.log(JSON.parse(data));
})
});

request.write(jsonData);
request.end();

});

app.post("/failure", function(req,res){
  res.redirect("/");
})

app.listen(process.env.PORT || 3000, function(){
  console.log("server is ruunning");
});
//api key
//413c9e819b02a524de7ed7691e81b870-us6

//list id
//e7dc1f396e