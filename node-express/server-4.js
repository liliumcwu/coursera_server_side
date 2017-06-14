/* going to make use of express router */

var express = require('express');
var morgan = require('morgan'); // allows us to log info on server side
var bodyParser = require('body-parser');
// enables us to parse the data and add it to a javascript object


var hostname = 'localhost';
var port = 3000;

var app = express();

// let's make use of morgan to print out some info from server side
// say that morgan will be one of the middleware used by express
app.use(morgan('dev')); // dev is a preprogrammed log output that morgan supports

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

// attach router to express app
app.use('/dishes', dishRouter); // if url contains /dishes, apply dishRouter

app.use(express.static(__dirname + '/public')); // public is source of static files

app.listen(port, hostname, function() {
  console.log(`Server running at http://${hostname}:${port}`);
});
