/* Author: Lily, Date: June 15, 2017, edited June 16
  This Node module is implemented and used within my server to support
  the /dishes end point. The REST API supports GET, POST and DELETE
  operations on /dishes and GET, PUT and DELETE operations on
  /dishes/:id end points.
*/

var express = require('express');
var bodyParser = require('body-parser');
// enables us to parse the data and add it to a javascript object

var mongoose = require('mongoose');
var Dishes = require('../models/dishes');

var dishRouter = express.Router();
dishRouter.use(bodyParser.json());
//if json, bodyParser will parse and make available to dishRouter
dishRouter.route('/')
.get(function(req,res,next) {
  Dishes.find({}, function(err, dish) {
    if (err) throw err;
    res.json(dish);
  });
}) // no semicolon

.post(function(req,res,next) {
  Dishes.create(req.body, function(err, dish) {
    if (err) throw err;
    console.log('Dish created!');
    var id = dish._id;
    res.writeHead(200, {
      'Content-Type': 'text/plain'
    });

    res.end('Added the dish with id: ' + id);
  });
}) // ditto

.delete(function(req,res,next) { // delete all the dishes
  Dishes.remove({}, function(err, resp) {
    if (err) throw err;
    res.json(resp); // resp indicates how many dishes were deleted
  });
}); // semicolon completes the chain

dishRouter.route('/:dishId')

.get(function(req,res,next) {
  Dishes.findById(req.params.dishId, function(err, dish) {
    if (err) throw err;
    res.json(dish);
  });
})

.put(function(req,res,next) {
  Dishes.findByIdAndUpdate(req.params.dishId, {
    $set: req.body
  }, {
    new: true
  }, function (err, dish) {
    if (err) throw err;
    res.json(dish);
  });
})

.delete(function(req,res,next) {
  Dishes.findByIdAndRemove(req.params.dishId, function(err, resp) {
    if (err) throw err;
    res.json(resp);
  });
}); // completes this chain

dishRouter.route('/:dishId/comments')
.get(function(req,res,next) {
  Dishes.findById(req.params.dishId, function(err, dish) {
    if (err) throw err;
    res.json(dish.comments);
  });
})

.post(function(req,res,next) {
  Dishes.findById(req.params.dishId, function(err, dish) {
    dish.comments.push(req.body);
    dish.save(function (err, dish) {
      if (err) throw err;
      console.log('Updated comments!');
      res.json(dish);
    });
  });
})

.delete(function(req,res,next) {
  if (err) throw err;
  for (var i = dish.comments.length - 1; i >= 0; i--) {
    dish.comments.id(dish.comments[i]._id).remove();
  }
  dish.save(function(err, result) {
    if (err) throw err;
    res.writeHead(200, {
      'Content-Type': 'text/plain'
    });
    res.end('Deleted all comments!');
  });
});

dishRouter.route('/:dishId/comments/:commentId')

.get(function(req,res,next) {
  Dishes.findById(req.params.dishId, function(err, dish) {
    if (err) throw err;
    res.json(dish.comments.id(req.params.commentId));
  });
})

.put(function(req,res,next) {
  Dishes.findById(req.params.dishId, function(err, dish) {
    if (err) throw err;
    dish.comments.id(req.params.commentId).remove(); // drop existing comment
    dish.comments.push(req.body); // adding new comment
    dish.save(function(err,dish) {
      if (err) throw err;
      console.log('Updated comments!');
      console.log(dish);
      res.json(dish);
    });
  });
})

.delete(function(req,res,next) {
  Dishes.findById(req.params.dishId, function(err, dish) {
    dish.comments.id(req.params.commentId).remove();
    dish.save(function(err, resp) {
      if (err) throw err;
      res.json(resp);
    });
  });
});


module.exports = dishRouter; // so server can use


