var express = require('express');
const parser = require('body-parser');
var server = express();
const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectId

server.use(parser.json());
server.use(parser.urlencoded({extended: true}));
server.use(express.static("client/build"));

MongoClient.connect("mongodb://localhost:27017", function(err, client){
  if(err){
    console.log(err);
    return;
  }
  const db = client.db("buckit");
  console.log("Connected to buckit!");

  server.get("/api/buckit", function(req, res, next) {
    console.log("Inside home route");
    const countriesToVisit = db.collection('toVisit');
    countriesToVisit.find().toArray(function(err, countriesToVisit){
      if(err) next(err);
      res.json(countriesToVisit);
    })
  });

  server.post("/api/buckit", function(req, res){
    const countriesToVisit = db.collection('toVisit')
    const countryToSave = req.body;
    countriesToVisit.save(countryToSave, function(err, result, next){
      if(err) next(err);
      res.status(201)
      res.json(result.ops[0]);
    });
  });


  server.listen(3000, function(){
    console.log('listening on port 3000');
  });


});
