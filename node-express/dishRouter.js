/* Author: Lily, Date: June 15, 2017
  This Node module is implemented and used within my server to support
  the /dishes end point. The REST API supports GET, POST and DELETE
  operations on /dishes and GET, PUT and DELETE operations on
  /dishes/:id end points.
*/

var express = require('express');
var bodyParser = require('body-parser');
// enables us to parse the data and add it to a javascript object

var dishRouter = express.Router();
dishRouter.use(bodyParser.json());
//if json, bodyParser will parse and make available to dishRouter
dishRouter.route('/')
.all(function(req,res,next) {
  res.writeHead(200, {'Content-type': 'text/plain'});
  next();
})

.get(function(req,res,next) { // get is chained to .route
  res.end('Will send all the dishes to you!');
}) // so no semicolon

.post(function(req,res,next) { // ditto
  res.end('Will add the dish: ' + req.body.name + ' with details: '
          + req.body.description);
}) // ditto

.delete(function(req,res,next) { // ditto
  res.end('Deleting all dishes');
}); // semicolon completes the chain

dishRouter.route('/:dishId')
.all(function(req,res,next) {
  res.writeHead(200, {'Content-type': 'text/plain'});
  next();
})

.get(function(req,res,next) {
  res.end('Will send the details of the dish: ' + req.params.dishId
  + ' to you!');
})

.put(function(req,res,next) {
  res.write('Updating the dish: ' + req.params.dishId + '\n');
  res.end('Will update the dish: ' + req.body.name + ' with details: '
  + req.body.description);
})

.delete(function(req,res,next) {
  res.end('Deleting dish: ' + req.params.dishId);
}); // completes this chain

module.exports = dishRouter; // so server can use


