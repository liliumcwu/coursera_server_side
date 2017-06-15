/* Author: Lily, Date: June 15, 2017
  This Node module creates a server. It implements and uses dishRouter,
  promoLeader, and leaderRouter to support the routes for their
  respective REST APIs.
*/
var express = require('express');
var morgan = require('morgan'); // allows us to log info on server side
var dishRouter = require('./dishRouter');
var promoRouter = require('./promoRouter');
var leaderRouter = require('./leaderRouter');

var hostname = 'localhost';
var port = 3000;

var app = express();

app.use(morgan('dev')); // dev is a preprogrammed log output that morgan supports

app.use('/dishes', dishRouter); // if url contains /dishes, apply dishRouter
app.use('/promotions', promoRouter); // if url contains /promos, apply promoRouter
app.use('/leadership', leaderRouter); // if url contains /leaders, apply leaderRouter

app.use(express.static(__dirname + '/public')); // public is source of static files

app.listen(port, hostname, function() {
  console.log(`Server running at http://${hostname}:${port}`);
});
