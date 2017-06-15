/* Author: Lily, Date: June 15, 2017
  This Node module is implemented and used within my server to support
  the /promos end point. The REST API supports GET, POST and DELETE
  operations on /dishes and GET, PUT and DELETE operations on
  /promos/:id end points.
*/

var express = require('express');
var bodyParser = require('body-parser');
// enables us to parse the data and add it to a javascript object

var promoRouter = express.Router();
promoRouter.use(bodyParser.json());
//if json, bodyParser will parse and make available to promoRouter
promoRouter.route('/')
.all(function(req,res,next) {
  res.writeHead(200, {'Content-type': 'text/plain'});
  next();
})

.get(function(req,res,next) { // get is chained to .route
  res.end('Will send all the promos to you!');
}) // so no semicolon

.post(function(req,res,next) { // ditto
  res.end('Will add the promo: ' + req.body.name + ' with details: '
          + req.body.description);
}) // ditto

.delete(function(req,res,next) { // ditto
  res.end('Deleting all promos');
}); // semicolon completes the chain

promoRouter.route('/:promoId')
.all(function(req,res,next) {
  res.writeHead(200, {'Content-type': 'text/plain'});
  next();
})

.get(function(req,res,next) {
  res.end('Will send the details of the promo: ' + req.params.promoId
  + ' to you!');
})

.put(function(req,res,next) {
  res.write('Updating the promo: ' + req.params.promoId + '\n');
  res.end('Will update the promo: ' + req.body.name + ' with details: '
  + req.body.description);
})

.delete(function(req,res,next) {
  res.end('Deleting promo: ' + req.params.promoId);
}); // completes this chain

module.exports = promoRouter; // so server can use
