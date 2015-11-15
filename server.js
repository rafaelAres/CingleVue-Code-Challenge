
var express = require('express');
var mongojs = require('mongojs');
var bodyParser = require('body-parser');
var db = mongojs('schoolList',['schoolList']);
var app = express();

app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json());
    app.get('/schools', function(req,res){
        console.log("GET request")
        db.schoolList.find(function (err,docs){
            res.send(docs);
        });

    });

app.post('/schools', function(req,res){
   console.log(req.body);
    db.schoolList.insert(req.body, function(err,doc){
        res.send(doc);
    })
});

app.delete('/schools/:id', function (req,res){
    var id = req.params.id;
    console.log(id);
    db.schoolList.remove({_id: mongojs.ObjectId(id)}, function (err, doc) {
        res.send(doc);
    });
});

app.get('/schools/:id', function (req, res) {
    var id = req.params.id;
    console.log(id);
    db.schoolList.findOne({_id: mongojs.ObjectId(id)}, function (err, doc) {
        res.send(doc);
    });
});
app.put('/schools/:id', function (req, res) {
    var id = req.params.id;
    console.log(req.body.name);
    db.schoolList.findAndModify({
            query: {_id: mongojs.ObjectId(id)},
            update: {$set: {name: req.body.name, address: req.body.address, phone: req.body.phone, region: req.body.region, numberstudents: req.body.numberstudents, urlimage: req.body.urlimage}},
            new: true}, function (err, doc) {
            res.send(doc);
        }
    );
});
app.listen(3000);
console.log("running on 3000");
