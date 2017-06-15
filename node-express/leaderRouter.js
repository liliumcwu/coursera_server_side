var express = require('express');
var bodyParser = require('body-parser');
// enables us to parse the data and add it to a javascript object

var leaderRouter = express.Router();
leaderRouter.use(bodyParser.json());
//if json, bodyParser will parse and make available to leaderRouter
leaderRouter.route('/')
.all(function(req,res,next) {
  res.writeHead(200, {'Content-type': 'text/plain'});
  next();
})

.get(function(req,res,next) { // get is chained to .route
  res.end('Will send all the leaders to you!');
}) // so no semicolon

.post(function(req,res,next) { // ditto
  res.end('Will add the leader: ' + req.body.name + ' with details: '
          + req.body.description);
}) // ditto

.delete(function(req,res,next) { // ditto
  res.end('Deleting all leaders');
}); // semicolon completes the chain

leaderRouter.route('/:leaderId')
.all(function(req,res,next) {
  res.writeHead(200, {'Content-type': 'text/plain'});
  next();
})

.get(function(req,res,next) {
  res.end('Will send the details of the leader: ' + req.params.leaderId
  + ' to you!');
})

.put(function(req,res,next) {
  res.write('Updating the leader: ' + req.params.leaderId + '\n');
  res.end('Will update the leader: ' + req.body.name + ' with details: '
  + req.body.description);
})

.delete(function(req,res,next) {
  res.end('Deleting leader: ' + req.params.leaderId);
}); // completes this chain

module.exports = leaderRouter;
