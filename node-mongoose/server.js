var mongoose = require('mongoose'),
    assert = require('assert');

var Dishes = require('./models/dishes');

// Connection URL
var url = 'mongodb://localhost:27017/conFusion';
mongoose.connect(url);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
  console.log('Connected correctly to server');
  // create a new dish
  Dishes.create({
    name: 'Uthapizza',
    image: "images/uthapizza.png",
    category: "mains",
    label: "Hot",
    price: "4.99",
    description: 'Test',
    comments: [
      {
        rating: 3,
        comment: 'blablacomment',
        author: 'LilsTheAuthor'
      }
    ]
  }, function (err, dish) {
    if (err) throw err;
    console.log('Dish created!');
    console.log(dish);
    var id = dish._id;

    // get all the dishes
    setTimeout(function () {
      // after 3 seconds
      Dishes.findByIdAndUpdate(id, {
              $set: {
                description: 'updated test'
              }
            }, {
              new: true // so it will return the updated dish
            })
            .exec(function (err, dish) {
              if (err) throw err;
              console.log('Updated Dish!');
              console.log(dish);

              dish.comments.push({
                rating: 5,
                comment: 'pika!',
                author: 'Tommy'
              });

              dish.save(function (err, dish) {
                console.log('updated comments!');
                console.log(dish);
                db.collection('dishes').drop(function() {
                db.close();
                  });
              });
            });
    }, 3000);
  });
});
