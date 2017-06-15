var MongoClient = require('mongodb').MongoClient,
    assert = require('assert');

// connecting to the database server
// Connection URL
var url = 'mongodb://localhost:27017/conFusion';
// use connect method to connect to the server
MongoClient.connect(url, function(err,db) {
  assert.equal(err,null); // establish that there was no error connecting to server
  console.log('Connected correctly to server');
  var collection = db.collection('dishes'); // currently empty

  // insert a document into collection
  collection.insertOne({name: 'YummyFood', description: 'YummyDescription'},
    function(err,result) {
      assert.equal(err,null);
      console.log('After insert: ');
      console.log(result.ops); // should show inserted document

      // in callback fxn bc once inserted, we want to find stuff in the collection
      collection.find({}).toArray(function(err,docs){
        assert.equal(err,null);
        console.log('Found:');
        console.log(docs);

        // drop the collection to return database to pristine condition
        db.dropCollection('dishes', function(err, result) {
          assert.equal(err,null);
          db.close(); // close my connection to the database
        });
      });
    });
});
