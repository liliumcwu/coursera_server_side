var mongoose = require('mongoose'),
    assert = require('assert');

var Leaders = require('./models/leadership');

// Connection URL
var url = 'mongodb://localhost:27017/conFusion';
mongoose.connect(url);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
  console.log('Connected correctly to server');
  // create a new leader
  Leaders.create({
    name: 'bruh Pan',
    image: "images/alberto.png",
    designation: 'Chief Executive Officer',
    abbr: "CEO",
    description: 'Test'
  }, function (err, leader) {
    if (err) throw err;
    console.log('Leader created!');
    console.log(leader);
    var id = leader._id;

    // get all the leaders
    setTimeout(function () {
      // after 3 seconds
      Leaders.findByIdAndUpdate(id, {
              $set: {
                description: 'updated test'
              }
            }, {
              new: true // so it will return the updated dish
            })
            .exec(function (err, leader) {
              if (err) throw err;
              console.log('Updated Dish!');
              console.log(leader);

              db.collection('leaders').drop(function() {
                db.close();
              });
            });
    }, 3000);
  });
});
