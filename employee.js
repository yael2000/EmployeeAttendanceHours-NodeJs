const express = require('express');
const router = express.Router()
const fs = require('fs');
const MongoClient = require('mongodb').MongoClient;
const updateJsonFile = require('update-json-file')


//מקבל את כל העובדים
router.get('/getemployees', function (req, res) {
  var employee = null;
  fs.readFile("employeeDetails.json", "utf-8", function (err, data) {
    if (err)
      employees = [];
    else
      employees = JSON.parse(data);
    var arr = [];
    for (var i = 0; i < employees.length; i++) {
      employee = employees[i];
      arr[i] = "שם עובד:" + employee.firstName + "    טלפון:" + employee.phone;
    }
    res.send(arr);
  })
});

//מקבל פרטי עובד בודד לפי ID
router.get('/getEmployee/:id', function (req, res) {
  var employee = null;
  console.log(req.params);
  fs.readFile("employeeDetails.json", "utf-8", function (err, data) {
    if (err)
      employees = [];
    else
      employees = JSON.parse(data);
    var find = false;
    for (var i = 0; i < employees.length; i++) {
      console.log(employees[i].id);
      if (req.params.id == employees[i].id) {
        find = true;
        employee = employees[i];
      }
    }
    if (!find) {
      res.status(500);
      res.send("not found");
    }
    else {
      res.send(employee);
    }
  })
});



//מחיקת עובד
router.get('/deleteEmployee/:id', function (req, res) {
  var find= false;
  const filePath = 'C:/לימודים/mongo db/nodeJS/employeeDetails.json'
  const options = { defaultValue: () => ({}) }
  updateJsonFile(filePath, (data) => {
    var count = Object.keys(data).length;
  
    console.log(count)
    for (var i = 0; i < count; i++) {

      if (data[i].id == req.params.id) {
        find=true;
        console.log("before:")
        console.log(data[i])
        data[i].isActive = "false"
        console.log("after")
        console.log(data[i])
    
      }
    }
 
    return data 
 
  }, options)


    res.send("the emlpyee deleted!")

  
});


//הוספת עובד
router.post('/addEmployee', (req, res) => {
  var Id = req.body.id;
  var FirstName = req.body.firstName;
  var LastName = req.body.lastName;
  var Adress = req.body.adress;
  var Phone = req.body.phone;
  var Email = req.body.email;
  fs.readFile("employeeDetails.json", "utf-8", function (err, data) {
    if (err)
      emps = [];
    else
      emps = JSON.parse(data);
    let emp = {
      id: Id,
      firstName: FirstName,
      lasttName: LastName,
      address: Adress,
      phone: Phone,
      mail: Email,
      isActive: "true"
    };
    emps.push(emp);
    emps = JSON.stringify(emps);
    console.log(emps)
    fs.writeFile("employeeDetails.json", emps, function (err) {
    });
    console.log("User id = " + Id + ",  FirstName " + FirstName + ",  LastName " + LastName);
    res.end("yes");
  });
})
module.exports = router;

