//run this file with nodejs
var userDir = require('../dals/account.json');
const fs = require('fs');
const express = require('express');
var bodyParser = require('body-parser');
app.use(express.json())
const app = express();

var encodeBodyParser = app.use(express.urlencoded({ extended: true }))

// for parsing application/json

app.get('/register', function(req, res) {
    var data = {
        firstName: req.query.regName,
        lastName: "",
        email: req.query.regEmail,
        password: req.query.regPass,
        phone: "012345678",
        desc: `${req.query.regName} Desc`,
        roll: "0"
    }

    var accJSONData = fs.readFileSync('../dals/account.json');
    var accData = JSON.parse(accJSONData);

    accData['account'].push(data);

    jsonStr = JSON.stringify(accData, null, 2);

    fs.writeFile('../dals/accountRegister.json', jsonStr, err => {
        if (err) {
            console.log(error);
        } else {
            console.log("Write file success");
        }
    })

    res.redirect('http://127.0.0.1:5500/management.html')
});


var server = app.listen(8000, function() {
    console.log('Server is running at http://localhost:' + server.address().port);
})