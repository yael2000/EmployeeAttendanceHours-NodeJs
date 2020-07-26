const express = require('express');
const router = express.Router()
const fs = require('fs');


router.post('/addday/', (req, res) => {
    console.log("ggg")
    var Id = req.body.id;
    var Date = req.body.day;
    var EnterTime = req.body.enter;
    var LeaveTime = req.body.leave;
    console.log(Id);
    var text = " employee id: " + Id + " Date: " + Date + " Enter Time: " + EnterTime + " Leave Time: " + LeaveTime
    console.log(text)
    fs.appendFile(Id, text, function (err) {
        if (err) throw err;
        console.log('Saved!');
    });

})


router.get('/getDetails/:id', function (req, res) {
    console.log("jjj")
    console.log(req.params);

    fs.readFile(req.params.id, "utf-8", function (err, data) {
        if (err) { console.log(err) }
        console.log(data);
        res.send(data)
    })

});

module.exports = router;

