const express = require('express');
const app = express();
const employee = require('./employee')
const Hours=require('./Hours')
const fs = require('fs');

//const teacher = require('./teacher')
var bodyParser = require('body-parser');


app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true }));




//פונקציה שתמיד מגיע אליה קודם ואז ממשיך הלאה כי יש לה נקסט
app.use(function (req, res, next) {
   res.header("Access-Control-Allow-Origin", "*");
   next();
})
app.listen(3000, function () {
  console.log('Example app listening on port 3000');
});

app.get('/', function (req, res) {
  fs.readFile('home.html',function(err,data){
    res.writeHead (200,{"content-Type":"text/html"})
    res.write(data)
    res.end()});
});

app.get('/employee', function (req, res) {
  fs.readFile('index.html',function(err,data){
    res.writeHead (200,{"content-Type":"text/html"})
    res.write(data)
    res.end()});
});
app.get('/empHours', function (req, res) {
  fs.readFile('Hours.html',function(err,data){
    res.writeHead (200,{"content-Type":"text/html"})
    res.write(data)
    res.end()});
});
  
app.use('/employee',employee);
app.use('/empHours',Hours)

app.use(function (req, res, next) {
    console.log("url not found");
    next();
   });
   

  



  

  