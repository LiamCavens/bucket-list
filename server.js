var express = require('express');
var app = express();
var path = require('path')
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
  res.sendFile(path.join(__dirname + '/client/build/index.html'));
});


var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('app listening at http://%s:%s', host, port);
});


})
