var express = require('express');
var morgan = require('morgan'); // allows us to log info on server side

var hostname = 'localhost';
var port = 3000;

var app = express();

// let's make use of morgan to print out some info from server side

// say that morgan will be one of the middleware used by express
app.use(morgan('dev')); // dev is a preprogrammed log output that morgan supports
app.use(express.static(__dirname + '/public')); // public is source of static files

app.listen(port, hostname, function() {
  console.log(`Server running at http://${hostname}:${port}`);
});


