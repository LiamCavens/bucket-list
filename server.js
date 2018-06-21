var express = require('express');
var app = express();
const parser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectId

app.use(parser.json());
app.use(parser.urlencoded({extended: true}));
app.use(express.static('client/build'))

MongoClient.connect('mongodb://localhost:27017', function(err, client){
  if(err){
    console.log(err);
    return;
  }

  const db = client.db("buckit");
  console.log("Connected to buckit!");

app.get('/', function (req, res) {
  const countriesToVisit = db.collection('toVisit')
  countriesToVisit.find().toArray(function(err, countriesToVisit, next){
    if(err) next(err);
    console.log(countriesToVisit);
    res.json(countriesToVisit);
  })
});
  app.post("/", function(req, res){
    const countriesToVisit = db.collection('toVisit')
    const countryToSave = req.body;
    countriesToVisit.save(countryToSave, function(err, result, next){
      if(err){
        next(err);
      }
      console.log(countriesToVisit);
      res.status(201)
      res.json(result.ops[0]);
    });
  });


var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('app listening at http://%s:%s', host, port);
});


})
