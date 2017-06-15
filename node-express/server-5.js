/* to be submitted for assignment 1 */
var express = require('express');
var morgan = require('morgan'); // allows us to log info on server side
var dishRouter = require('./dishRouter');

var hostname = 'localhost';
var port = 3000;

var app = express();

app.use(morgan('dev')); // dev is a preprogrammed log output that morgan supports

app.use('/dishes', dishRouter); // if url contains /dishes, apply dishRouter

app.use(express.static(__dirname + '/public')); // public is source of static files

app.listen(port, hostname, function() {
  console.log(`Server running at http://${hostname}:${port}`);
});
