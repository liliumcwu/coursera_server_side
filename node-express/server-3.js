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

app.use(bodyParser.json()); // using the json parser

// specify what to do when request received
app.all('/dishes', function(req,res,next) {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  next(); // parser should continue from this point
});

app.get('/dishes', function(req,res,next) {
  res.end('Will send all the dishes to you!');
});

app.post('/dishes', function(req,res,next) {
  res.end('Will add the dish: ' + req.body.name + ' with details: '
          + req.body.description);
});

app.delete('/dishes', function(req,res,next) {
  res.end('Deleting all dishes');
});

app.get('/dishes/:dishId', function(req,res,next) {
  res.end('Will send the details of the dish: ' + req.params.dishId
  + ' to you!');
});

app.put('/dishes/:dishId', function(req,res,next) {
  res.write('Updating the dish: ' + req.params.dishId + '\n');
  res.end('Will update the dish: ' + req.body.name + ' with details: '
  + req.body.description);
});

app.delete('/dishes/:dishId', function(req,res,next) {
  res.end('Deleting dish: ' + req.params.dishId);
});

app.use(express.static(__dirname + '/public')); // public is source of static files

app.listen(port, hostname, function() {
  console.log(`Server running at http://${hostname}:${port}`);
});
