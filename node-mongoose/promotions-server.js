var mongoose = require('mongoose'),
    assert = require('assert');

var Promotions = require('./models/promotions');

// Connection URL
var url = 'mongodb://localhost:27017/conFusion';
mongoose.connect(url);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
  console.log('Connected correctly to server');
  // create a new promotion
  Promotions.create({
    name: 'Weekend rqw Buffet',
    image: "images/buffet.png",
    label: 'new',
    price: "19.99",
    description: 'Test'
  }, function (err, promotion) {
    if (err) throw err;
    console.log('Promotion created!');
    console.log(promotion);
    var id = promotion._id;

    // get all the promotions
    setTimeout(function () {
      // after 3 seconds
      Promotions.findByIdAndUpdate(id, {
              $set: {
                description: 'updated test'
              }
            }, {
              new: true // so it will return the updated dish
            })
            .exec(function (err, promotion) {
              if (err) throw err;
              console.log('Updated Dish!');
              console.log(promotion);

              db.collection('promotions').drop(function() {
                db.close();
              });
            });
    }, 3000);
  });
});
