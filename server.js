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

app.get('/buckit', function (req, res, next) {
  const countriesToVisit = db.collection('toVisit')
  const countriesVisited = db.collection('visited')
  countriesToVisit.find().toArray(function(err, countriesToVisit){
    if(err) next(err);
    res.json(countriesToVisit);
  })
  countriesVisited.find().toArray(function(err, countriesVisited){
    if(err) next(err);
    res.json(countriesVisited);
  })
});


var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('app listening at http://%s:%s', host, port);
});


})
